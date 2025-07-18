"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogTrigger,
    DialogContent
} from "@/components/ui/dialog";
import { commandIcon } from '@/app/utils/Icons';
import { Command, CommandInput } from '@/components/ui/command';
import { useGlobalContext, useGlobalContextUpdate } from '@/app/context/globalContext';

function SearchDialog() {
    const { geoCodedList, inputValue, setInputValue, handleInput } = useGlobalContext();
    const { setActiveCityCoords } = useGlobalContextUpdate();
    const [hoveredIndex, setHoveredIndex] = useState<number>(0);
    const [open, setOpen] = useState(false);

    const onCityClick = (lat: number, lon: number) => {
        setActiveCityCoords([lat, lon]);
        setOpen(false);
        setInputValue('');
    };

    return (
        <div className='search-btn'>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#0f0f0f] hover:bg-slate-100  ease-in-out duration-200"
                    >
                        <p className="text-sm text-muted-foreground">Search Here...</p>
                        <div className="command dark:bg-[#262626] bg-slate-200  py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2">
                            {commandIcon}
                            <span className="text-[9px]">F</span>
                        </div>
                    </Button>
                </DialogTrigger>

                <DialogContent className='p-0'>
                    <Command className='rounded-lg border shadow-md'>
                        <CommandInput placeholder='Type a command or search'
                            value={inputValue}
                            onChangeCapture={e => handleInput(e)}
                        />
                        <ul className="px-3 pb-2">
                            <p className='p-2 text-sm text-muted-foreground'>Suggestions</p>
                            {geoCodedList?.length === 0 || (!geoCodedList && <p>No Results</p>)}

                            {geoCodedList && geoCodedList.map((item: {
                                name: string;
                                country: string;
                                state: string;
                                lat: number;
                                lon: number;
                            }, index: number) => {
                                const { name, state, country, lat, lon } = item;
                                return <li key={index} className={`py-3 px-2 text-sm cursor-pointer rounded-sm ${hoveredIndex === index ? "bg-accent" : ""}`}
                                    onMouseEnter={() => {
                                        setHoveredIndex(index);
                                    }}
                                    onClick={() => {
                                        onCityClick(
                                            lat,
                                            lon
                                        )
                                    }}>
                                    <p className='text-sm'>{name}, {state ? state + ', ' : ''} {country}</p>
                                </li>;
                            })}
                        </ul>
                    </Command>
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default SearchDialog
