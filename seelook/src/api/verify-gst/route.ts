// import { NextResponse } from 'next/server';
//
// export async function POST(request: Request) {
//     try {
//         const body = await request.json();
//
//         const response = await fetch('/api/verify/gst', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'x-client-id': '50d85646-96c7-4e3a-b6c3-095949181b5c',
//                 'x-client-secret': 'FGZGiHix5IHjXmI21ZGTmXjUAMH4Q8M3',
//                 'x-product-instance-id': 'fc0682ae-6eda-4b50-999f-29e720ac4ba2'
//             },
//             body: JSON.stringify(body)
//         });
//
//         const data = await response.json();
//         return NextResponse.json(data);
//     } catch (error) {
//         return NextResponse.json(
//             { error: 'Failed to verify GSTIN' },
//             { status: 500 }
//         );
//     }
// }