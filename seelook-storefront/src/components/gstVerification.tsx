"use client"
import React, { useState } from 'react';
import {AlertCircle, CheckCircle2, Loader, ArrowLeft, Loader2} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@lib/components/ui/alert';
import { Button } from '@lib/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@lib/components/ui/card';
import { Input } from '@lib/components/ui/input';
import { handleVerify } from "./test-action";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const GSTVerificationPage = () => {
    const [gstin, setGstin] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        const formData = new FormData(e.currentTarget);
        const result = await handleVerify(formData);

        setLoading(false);
        setError(result.error);
        setSuccess(result.success);
    };

    return (
        <div className="w-full max-w-md mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>GST Verification</CardTitle>
                    <CardDescription>
                        Enter a GSTIN to verify its validity
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                name="gstin"
                                value={gstin}
                                onChange={(e) => setGstin(e.target.value.toUpperCase())}
                                placeholder="Enter GSTIN"
                                disabled={loading}
                                className="flex-1"
                            />
                            <Button type="submit" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Verifying
                                    </>
                                ) : (
                                    'Verify'
                                )}
                            </Button>
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {success && (
                            <Alert className="bg-green-50 p-4 rounded-lg flex items-start space-x-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
                                <div className="flex flex-col items-center w-full">
                                    <AlertTitle className="font-semibold text-green-800">Success</AlertTitle>
                                    <AlertDescription className="text-green-700">GSTIN verified successfully</AlertDescription>
                                    <AlertDescription className="mt-4 flex justify-center w-full">
                                        <LocalizedClientLink
                                            href="/collections/wholesale"
                                            className="text-gray-800 font-medium hover:text-green-600 uppercase transition-transform duration-300 transform hover:scale-105 flex items-center"
                                            data-testid="nav-store-link"
                                        >
                                            <ArrowLeft className="mr-2" /> go back
                                        </LocalizedClientLink>
                                    </AlertDescription>
                                </div>
                            </Alert>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default GSTVerificationPage;