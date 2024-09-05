import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import * as XLSX from 'xlsx';

//components
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { generateRandomId } from "@/lib/utils/generateRandomId";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import Icon from "../icon";

export interface IExcelData extends Array<any> {
    customId: string;
}

interface IKeys {
    id: string
    selected: boolean
    [key: string]: string | boolean
}

interface FileDrawUploadProps {
    onDataChange: (data: IExcelData[]) => void;
    onDataKeyChange: (key: string) => void;
    disabled?: boolean;
}

export default function FileDrawUpload({ onDataChange, onDataKeyChange, disabled = false }: FileDrawUploadProps) {
    const [dataKey, setDataKey] = useState<string | null>(null);
    const [keys, setKeys] = useState<IKeys[]>([]);
    const [data, setData] = useState<IExcelData[]>([]);
    const [filteredData, setFilteredData] = useState<IExcelData[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const onKeysChange = (key: IKeys) => {
        setKeys((prev) => (
            prev.map((item) => {
                if (item.id === key.id) {
                    return {
                        ...item,
                        selected: !item.selected
                    };
                }

                return item;
            }
            )))
    }

    const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = () => {
                const data = new Uint8Array(reader.result as ArrayBuffer);

                const workbook = XLSX.read(data, { type: "array" });

                let allData: IExcelData[] = [];

                workbook.SheetNames.forEach((sheetName) => {
                    const sheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(sheet);

                    const jsonDataWithId = jsonData.map((item: any) => {
                        let customId = generateRandomId();

                        while (allData.some(data => data.customId === customId)) {
                            customId = generateRandomId();
                        }

                        return {
                            ...item,
                            customId,
                        };
                    });

                    allData = allData.concat(jsonDataWithId);
                });

                const keys = allData.length > 0 ? Object.keys(allData[0]) : [];

                const keysWithId = keys.map((key) => {
                    let customId = generateRandomId();

                    while (allData.some(data => data.customId === customId)) {
                        customId = generateRandomId();
                    }

                    return {
                        id: customId,
                        selected: false,
                        key: key
                    };
                });


                setKeys(keysWithId);
                setData(allData);
                setFilteredData(allData);

                if (keys?.length > 0) {
                    setDataKey(keys[0]);
                }
            };

            event.target.value = '';
        }
    };

    const handleOpenChange = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const clearData = () => {
        setData([]);
        setKeys([]);
        setFilteredData([]);
    }

    const filterData = (data: IExcelData[]) => {
        if (data.length <= 0) return data;

        let newData: IExcelData[] = [...data];
        const selectedKeys = keys.filter(key => key.selected);

        selectedKeys.forEach(selectedKey => {
            const seenValues = new Set<any>();
            newData = newData.filter(item => {
                const value = item[selectedKey.key as any];
                if (value === undefined) return false;
                if (seenValues.has(value)) return false;
                seenValues.add(value);
                return true;
            });
        });

        newData = newData.filter(item => item[dataKey as any] !== undefined);

        return newData;
    }

    useEffect(() => {
        const filtered = filterData(data);
        setFilteredData(filtered);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keys, dataKey])


    useEffect(() => {
        onDataChange(filteredData);
    }, [filteredData, onDataChange])

    useEffect(() => {
        onDataKeyChange(dataKey as string);
    }, [dataKey, onDataKeyChange])

    return (
        <Sheet onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
                <Button
                    size='lg'
                    disabled={disabled}
                    className='h-20'
                    variant='outline'
                >
                    <Icon name="Upload" className="mr-2" />
                    {data.length > 0 ? filteredData?.length + ' Names' : 'Upload'}
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Upload Excel File</SheetTitle>
                    <SheetDescription>
                        Upload an excel file to draw a name from the list.
                    </SheetDescription>
                </SheetHeader>
                <div className='flex-col-container items-center gap-4 mt-4 overflow-auto'>
                    <Button
                        onClick={() => fileInputRef?.current?.click()}
                        className='h-20 w-full mt-2'
                        variant='outline'
                    >
                        <Icon name="Upload" className="mr-2" />
                        Upload
                    </Button>
                    <input
                        onChange={handleFileSelected}
                        multiple={false}
                        ref={fileInputRef}
                        type='file'
                        hidden
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        placeholder="Excel Only"
                    />
                    {keys?.length > 0 && (
                        <>
                            <h1 className='text-2xl py-10'>{filteredData?.length <= 0 ? '-' : filteredData?.length + ' Names'}</h1>
                            <div className='w-full'>
                                <strong >Clean repeated data from:</strong>
                                <div className='grid grid-cols-2 gap-4 mt-4 max-h-80 overflow-auto scrollbar-thin'>
                                    {keys?.map((key, index) => (
                                        <div
                                            key={key?.id} className='flex p-2 gap-2 rounded-md border-2 border-secondary cursor-pointer hover:opacity-70'
                                            onClick={() => onKeysChange(key)}
                                        >
                                            <Checkbox
                                                checked={key?.selected}
                                            />
                                            <Label
                                            >
                                                <span className='text-xs '>{key?.key}</span>
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='flex-col-container w-full mt-4'>
                                <strong>
                                    Which key to use for the draw?
                                </strong>
                                <small className='-mt-2 text-secondary-foreground/60'>
                                    After selecting the key, all non existing values of the key will be removed.
                                </small>
                                <div className='grid grid-cols-2 gap-4 mt-4 max-h-80 overflow-auto scrollbar-thin'>
                                    {keys?.map((key, index) => (
                                        <div
                                            key={key?.id} className='flex p-2 gap-2 rounded-md border-2 border-secondary cursor-pointer hover:opacity-70'
                                            onClick={() => setDataKey(key?.key as string)}
                                        >
                                            <Checkbox
                                                checked={key?.key === dataKey}
                                            />
                                            <Label
                                            >
                                                <span className='text-xs '>{key?.key}</span>
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <SheetFooter className='grid grid-cols-1 gap-2 mt-8'>
                    {data.length > 0 && (
                        <Button
                            onClick={clearData}
                            variant='destructive'
                            className='h-14'
                        >
                            <Icon name="Save" className="mr-2" />
                            Clean Data
                        </Button>
                    )}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
