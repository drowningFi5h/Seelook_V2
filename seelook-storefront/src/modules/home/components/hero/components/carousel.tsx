import React from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { cn } from '@lib/utils';

interface Item {
    header: string;
    description: string;
    bg: string[];
    imgUrl: string;
}

const CustomNavButton = styled(Button)(({ theme }) => ({
    margin: '0 10px',
    position: 'relative',
    backgroundColor: 'red',
    top: 'calc(50% - 20px)',
    color: 'white',
    fontSize: '30px',
    transition: '200ms',
    cursor: 'pointer',
    '&:hover': {
        opacity: 0.6,
        backgroundColor: 'black',
        filter: 'brightness(120%)'
    }
}));

const NavButtonWrapper = styled('div')(({ theme }) => ({
    position: 'absolute',
    height: '100px',
    backgroundColor: 'transparent',
    top: 'calc(50% - 70px)',
    '&:hover': {
        '& button': {
            backgroundColor: 'black',
            filter: 'brightness(120%)',
            opacity: 0.4
        }
    }
}));

const ItemComponent = (props: { item: Item }) => {
    const header = props.item.header.split("\n");
    const bgColor = props.item.bg[0];

    return (
        <div
            className={cn("absolute right-0 left-0 bottom-0 top-0 flex flex-row items-center justify-center")}
            style={{backgroundColor: bgColor }}
        >
            <div className="md:relative absolute flex inset-0 justify-center w-full h-full md:w-[50vw] overflow-visible">
                <Image
                    src={props.item.imgUrl+'.svg'}
                    alt="hero"
                    height={100}
                    width={100}
                    className='h-full pt-14 w-auto min-w-fit h-auto min-h-fit'
                    priority={false}
                    placeholder="blur"
                    blurDataURL={props.item.imgUrl+'.png'}
                />
            </div>
            <div className="flex flex-col md:justify-center justify-end items-center h-full md:items-start md:text-left py-10 md:pr-12 z-10 w-[40em]">
                <h2 className="hidden md:block max-w-[55vw] text-[3.075em] leading-[3.7rem] libre-baskerville-bold pb-6">
                    {header.map((text, i) => <span key={i} className="block">{text}</span>)}
                </h2>
                <p className="hidden md:block max-w-[55vw] leading-[1.8rem] text-[1.125em] font-sans text-3xl">
                    {props.item.description}
                </p>
                <Button
                    variant='contained'
                    className='mt-16 rounded-none w-fit py-4 px-8 bg-black text-white text-md !text-opacity-80 normal-case'
                >
                    Shop Now
                </Button>
            </div>
        </div>
    )
}

interface NavButtonProps {
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
    next?: boolean;
    prev?: boolean;
}

const CustomCarouselNavButton: React.FC<NavButtonProps> = ({
                                                               onClick,
                                                               className,
                                                               style,
                                                               next,
                                                               prev
                                                           }) => {
    return (
        <CustomNavButton onClick={onClick} className={className} style={style}>
            <NavButtonWrapper>
                Hello
            </NavButtonWrapper>
            {next && "Next"}
            {prev && "Previous"}
        </CustomNavButton>
    )
}

export { CustomCarouselNavButton as CustomNavButton, ItemComponent as Item }