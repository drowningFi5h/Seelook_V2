"use server"

export const handleVerify = async (formData: FormData) => {
    let success = false;
    let error = '';

    try {
        const response = await fetch('https://dg-sandbox.setu.co/api/verify/gst', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-client-id': '50d85646-96c7-4e3a-b6c3-095949181b5c',
                'x-client-secret': 'FGZGiHix5IHjXmI21ZGTmXjUAMH4Q8M3',
                'x-product-instance-id': 'fc0682ae-6eda-4b50-999f-29e720ac4ba2'
            },
            body: JSON.stringify({ gstin: formData.get("gstin") })
        });

        const data = await response.json();
        if (data.verification === 'success') {
            success = true;
        } else {
            error = 'Invalid GSTIN';
        }
    } catch (err) {
        error = 'Failed to verify GSTIN. Please try again.';
    }

    return { success, error };
};