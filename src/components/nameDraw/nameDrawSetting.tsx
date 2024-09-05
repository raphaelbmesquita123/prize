//components
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button"
import { Label } from "../ui/label";
import Icon from "../icon"

export interface INameDrawSettings {
    namesDraws: number;
    showFireworks: boolean;
}

interface NameDrawSettingProps {
    namesDraws: number;
    showFireworks: boolean;
    setDrawNamesSettings: React.Dispatch<React.SetStateAction<INameDrawSettings>>
    disabled?: boolean;
}

export default function NameDrawSetting({ namesDraws, showFireworks, setDrawNamesSettings, disabled = false }: NameDrawSettingProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size='icon'
                    className='self-end h-6 w-6'
                    variant='ghost'
                    disabled={disabled}
                >
                    <Icon name='Settings' />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                        Configure the settings for the name draw.
                    </DialogDescription>
                </DialogHeader>
                <div className='space-y-4 mt-2'>
                    <div
                        className='flex p-2 gap-2 rounded-md border-2 border-secondary cursor-pointer hover:opacity-70'
                        onClick={() => setDrawNamesSettings(prev => ({ ...prev, showFireworks: !showFireworks }))}
                    >
                        <Checkbox checked={showFireworks} />
                        <div className='-mt-1'>
                            <Label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Show Fireworks
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                Show fireworks when a name is drawn.
                            </p>
                        </div>
                    </div>
                    <div
                        className='grid grid-cols-[1fr,160px] gap-2'
                    >
                        <div className='-mt-1'>
                            <Label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Names to Draws
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                Draws before the winner.
                            </p>
                        </div>
                        <div className='grid grid-cols-[auto,1fr,auto] gap-2 items-center'>
                            <Button
                                size='icon'
                                onClick={() => namesDraws > 0 && setDrawNamesSettings(prev => ({ ...prev, namesDraws: namesDraws - 1 }))}
                                disabled={namesDraws <= 0}
                            >
                                <Icon name='Minus' />
                            </Button>
                            <span className='py-2 text-center border-2 border-secondary rounded-md'>
                                {namesDraws}
                            </span>
                            <Button
                                size='icon'
                                onClick={() => setDrawNamesSettings(prev => ({ ...prev, namesDraws: namesDraws + 1 }))}
                            >
                                <Icon name='Plus' />
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}