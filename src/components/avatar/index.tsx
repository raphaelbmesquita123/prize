import {
    Avatar as AvatarComponent,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

interface AvatarProps {
    src?: string
    alt: string
    fallback: string
}

export function Avatar({ src, alt, fallback }: AvatarProps) {
    return (
        <AvatarComponent>
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>{fallback}</AvatarFallback>
        </AvatarComponent>
    )
}
