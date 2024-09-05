'use client'
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

//helpers
import { Api } from "@/helpers/http/api"

//components
import { Button } from "@/components/ui/button"

//interfaces
import { IWinnersResponse } from "@/app/api/winners/route"
import { IQueryPagination } from "@/helpers/types"
import Pagination from "@/components/pagination"

export default function Page() {
    const router = useRouter()
    const [winners, setWinners] = useState<IWinnersResponse>({} as IWinnersResponse)
    const [pagination, setPagination] = useState<IQueryPagination>({
        take: 10,
        skip: 0
    })

    const getWinners = useCallback(async () => {
        const response: IWinnersResponse = await Api.request({
            url: '/api/winners',
            method: 'GET',
            params: pagination
        })

        if (!response.data) {
            router.push('/')
        }

        setWinners(response)
    }, [pagination, router])

    useEffect(() => {
        getWinners()
    }, [getWinners])

    return (
        <div>
            <div className='m-auto max-w-5xl pt-8 px-4'>
                <div className='flex-container justify-between items-center'>
                    <h1 className='text-3xl font-bold text-primary dark:text-purple-400'>Winners</h1>
                    <Pagination 
                        queryPagination={pagination}
                        pagination={winners?.pagination}
                        onPageChange={setPagination}
                    />
                </div>
                <div className='grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2'>
                    {winners?.data?.map(w => {
                        const winner = (w?.winner && w?.winnerKey) ? Object(w?.winner)[w?.winnerKey] : ''
                        const formattedDate = new Date(w?.createdAt)?.toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        });

                        const formattedTime = new Date(w?.createdAt)?.toLocaleTimeString('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,  // Use 24-hour format
                        });

                        return (
                            <div
                                key={w?.id}
                                className='flex-col-container gap-1 bg-foreground/5 p-4 rounded-lg'
                            >
                                <div className='flex flex-col-reverse sm:flex-row sm:w-full sm:justify-between'>
                                    <small className='font-bold text-foreground/70'>{formattedDate} - {formattedTime}</small>
                                    <small className=''>Nº: {w.number}</small>
                                </div>
                                <p className='break-words font-bold text-primary dark:text-purple-400'>{winner}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}