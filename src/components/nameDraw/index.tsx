'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { fireworks } from '@tsparticles/fireworks';
import toast from 'react-hot-toast';
import { useTheme } from 'next-themes';

//helpers
import { Api } from '@/helpers/http/api';

//components
import FileDrawUpload, { IExcelData } from '@/components/fileDrawUpload';
import NameDrawSetting, { INameDrawSettings } from './nameDrawSetting';
import { Button } from '../ui/button';
import Icon from '../icon';

export default function NameDraw() {
    const { theme } = useTheme()
    const [data, setData] = useState<IExcelData[]>([]);
    const [dataKey, setDataKey] = useState<string>('');
    const [drawing, setDrawing] = useState(false);
    const [showFireworks, setShowFireworks] = useState(false);
    const [drawCount, setDrawCount] = useState(0);
    const [namDrawSettings, setNamDrawSettings] = useState<INameDrawSettings>({
        namesDraws: 10,
        showFireworks: true
    });
    const outputDisplayRef = useRef<HTMLDivElement>(null);

    const getRandomData = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * data.length);
        return data[randomIndex];
    }, [data])

    const escapeSelector = (id: string) => {
        return id.replace(/([\\^$*+?.()|[\]{}])/g, '\\$1');
    };

    const handleStartDraw = () => {
        if (data.length > 0) {
            setDrawing(true);
        } else {
            toast.error('Please upload a file with data to draw');
        }
    };

    const handleFireWorks = useCallback(async () => {
        const fireworkInstance = await fireworks({
            sounds: false,
            colors: ['#ff0000', '#00ff00', '#0000ff'],
            minHeight: 40
        });

        setTimeout(() => {
            fireworkInstance?.stop();
        }, 5000);
    }, []);

    const handleSaveWinner = async (winner: IExcelData) => {
        const response = await Api.request({
            url: '/api/winners',
            method: 'POST',
            data: JSON.stringify({
                winner,
                winnerKey: dataKey
            })
        });

        if (response.message === 'Unauthorized') {
            toast.error('Sorry, but the winner could not be saved to your account');
        }
    };

    useEffect(() => {
        if (drawing) {
            const luckElements = outputDisplayRef.current?.querySelectorAll('strong');
            const color = theme === 'dark' ? 'white' : 'black';

            luckElements?.forEach(element => {
                element.setAttribute('style', `color: ${color}`);
            });

            const interval = setInterval(() => {
                const lucky = getRandomData();
                if (drawCount >= (namDrawSettings?.namesDraws - 1)) {
                    clearInterval(interval);
                    setDrawing(false);
                    setDrawCount(0);
                    const escapedId = escapeSelector(lucky.customId);
                    const luckElement = outputDisplayRef.current?.querySelector(`#${escapedId}`);
                    luckElement?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'center'
                    });
                    const finalColor = theme === 'dark' ? 'yellow' : 'orange';
                    luckElement?.setAttribute('style', `color: ${finalColor}`);
                    handleSaveWinner(lucky);
                    setShowFireworks(true);
                    return;
                }

                if (lucky) {
                    const escapedId = escapeSelector(lucky.customId);
                    const luckElement = outputDisplayRef.current?.querySelector(`#${escapedId}`);
                    luckElement?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'center'
                    });
                }

                setDrawCount(prevCount => prevCount + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawing, drawCount, getRandomData, namDrawSettings?.namesDraws]);

    useEffect(() => {
        if (showFireworks && !drawing && namDrawSettings.showFireworks) {
            handleFireWorks();
        }
    }, [drawing, showFireworks, handleFireWorks, namDrawSettings.showFireworks]);

    return (
        <div className='flex-col-container w-full max-w-[800px]'>
            <NameDrawSetting
                namesDraws={namDrawSettings.namesDraws}
                showFireworks={namDrawSettings.showFireworks}
                setDrawNamesSettings={setNamDrawSettings}
                disabled={drawing}
            />
            <div
                className='flex flex-col gap-14 max-h-[100px] w-full overflow-auto p-5 rounded-[20px] bg-gradient-to-br from-[#5fff7a21] via-[#a97bfe2c] to-[#fe7bb828] animate-[laser_2s_linear_infinite] scrollbar-none pointer-events-none'
                ref={outputDisplayRef}
            >
                <strong className='text-5xl mt-2 text-nowrap'>
                    {data?.length > 0 ? 'Good Luck!' : 'Upload the file for the draw'}
                </strong>
                {data.map(item => (
                    <strong id={item?.customId} key={item.customId} className='text-5xl text-nowrap'>
                        {item[dataKey as any]}
                    </strong>
                ))}
            </div>
            <div className='grid grid-cols-2 gap-4 mt-8'>
                <FileDrawUpload
                    onDataChange={setData}
                    onDataKeyChange={setDataKey}
                    disabled={drawing}
                />
                <Button
                    onClick={handleStartDraw}
                    disabled={drawing}
                    size='lg'
                    className='h-20'
                >
                    <Icon name="Play" className="mr-2" />
                    {drawing ? 'Drawing...' : 'Start Draw'}
                </Button>
            </div>
        </div>
    );
}
