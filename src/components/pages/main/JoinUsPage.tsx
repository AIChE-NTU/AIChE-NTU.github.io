
import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { ExternalLinkIcon } from '../../components/Icons';
import Spinner from '../../components/Spinner';

interface JoinUsAssets {
    pageTitle: string;
    pageDescription: string;
    aicheMembershipUrl: string;
    membershipProofFormUrl: string;
    qrCodeImageUrl: string;
    step1: { title: string; description: string };
    step2: { title: string; description: string };
    step3: { title: string; description: string };
}

const JoinUsPage: React.FC = () => {
    const [assets, setAssets] = useState<JoinUsAssets | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const response = await fetch('/data/assets.json');
                const data = await response.json();
                setAssets(data.joinUs);
            } catch (error) {
                console.error("Failed to fetch assets:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAssets();
    }, []);

    if (isLoading) {
        return <div className="flex justify-center py-10"><Spinner /></div>;
    }

    if (!assets) {
        return <p className="text-center text-red-500">Could not load instructions. Please try again later.</p>;
    }

    return (
        <div className="space-y-16">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-text-main">{assets.pageTitle}</h1>
                <p className="mt-4 text-lg text-text-muted max-w-3xl mx-auto">
                    {assets.pageDescription}
                </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-12">
                {/* Step 1 */}
                <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary text-3xl font-bold">1</div>
                    <div className="flex-grow pt-2">
                        <h2 className="text-2xl font-bold mb-2">{assets.step1.title}</h2>
                        <p className="text-text-muted mb-4">{assets.step1.description}</p>
                        <a
                            href={assets.aicheMembershipUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                        >
                            <span>Go to AIChE Membership Page</span>
                            <ExternalLinkIcon className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-6">
                     <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary text-3xl font-bold">2</div>
                     <div className="flex-grow pt-2">
                        <h2 className="text-2xl font-bold mb-2">{assets.step2.title}</h2>
                        <p className="text-text-muted">{assets.step2.description}</p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-6">
                     <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary text-3xl font-bold">3</div>
                     <div className="flex-grow pt-2">
                        <h2 className="text-2xl font-bold mb-2">{assets.step3.title}</h2>
                        <p className="text-text-muted mb-6">{assets.step3.description}</p>
                        <div className="flex flex-col md:flex-row items-center gap-8 bg-surface-alt p-6 rounded-lg">
                           <a
                                href={assets.membershipProofFormUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full md:w-auto flex-grow bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-focus transition-all duration-300 transform hover:scale-105 text-center"
                            >
                                Open Submission Form
                            </a>
                            <div className="text-center">
                                <p className="text-text-muted mb-2 font-semibold">Or scan with your phone</p>
                                <Card className="p-2 inline-block">
                                    <img src={assets.qrCodeImageUrl} alt="QR Code for membership submission form" className="w-32 h-32" />
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinUsPage;