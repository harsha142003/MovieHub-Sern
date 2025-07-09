import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';

const ROWS = 4;
const CARDS_PER_ROW = 7;
const CARD_WIDTH = 260;
const CARD_HEIGHT = 160;
const CARD_RADIUS = 10;
const CARD_MARGIN = 20;
const ROW_SPACING = CARD_HEIGHT + 30;
const localImages = [
    '/assets/images/a.jpg',
    '/assets/images/a1.jpeg',
    '/assets/images/a2.jpeg',
    '/assets/images/a3.jpeg',
    '/assets/images/a4.jpg',
    '/assets/images/a5.jpg',
    '/assets/images/a6.jpg',
    '/assets/images/a7.jpg',
    '/assets/images/a8.jpg',
    '/assets/images/a9.jpg',
];

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

const AnimatedBackdrop = () => {
    const [cards, setCards] = useState([]);
    const rowsRef = useRef([]);
    const firstHalfRefs = useRef([]);

    useEffect(() => {
        // Use static images for cards
        const imageCards = localImages.map((img, idx) => ({
            type: 'local',
            id: idx,
            image: img,
        }));
        setCards(shuffle([...imageCards]));
    }, []);

    useLayoutEffect(() => {
        if (cards.length === 0) return;
        rowsRef.current.forEach((row, idx) => {
            if (!row || !firstHalfRefs.current[idx]) return;
            gsap.killTweensOf(row);
            const halfWidth = firstHalfRefs.current[idx].offsetWidth;
            const isEven = idx % 2 === 0;
            gsap.fromTo(
                row,
                { x: 0 },
                {
                    x: isEven ? -halfWidth : halfWidth,
                    duration: 20 + idx * 2,
                    repeat: -1,
                    ease: 'none',
                    modifiers: {
                        x: x => {
                            const w = halfWidth;
                            return isEven
                                ? `${((parseFloat(x) % -w) + w) % w - w}px` // left
                                : `${(parseFloat(x) % w)}px`; // right
                        }
                    },
                }
            );
        });
    }, [cards]);

    const getRows = () => {
        if (cards.length === 0) return Array(ROWS).fill([]);
        let allCards = [...cards];
        while (allCards.length < CARDS_PER_ROW) {
            allCards = allCards.concat(cards);
        }
        allCards = allCards.slice(0, CARDS_PER_ROW);
        const rows = [];
        for (let i = 0; i < ROWS; i++) {
            rows.push(allCards);
        }
        return rows;
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
                background: 'linear-gradient(135deg, #0c0c0c, #1a1a2e, #16213e)',
            }}
            aria-hidden="true"
        >
            <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {getRows().map((row, idx) => (
                    <div
                        key={idx}
                        ref={el => (rowsRef.current[idx] = el)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            position: 'absolute',
                            left: 0,
                            top: `${idx * ROW_SPACING}px`,
                            width: 'fit-content',
                            zIndex: idx === 2 ? 3 : idx % 2 === 0 ? 1 : 2,
                            whiteSpace: 'nowrap',
                        }}
                    >

                        <div
                            ref={el => (firstHalfRefs.current[idx] = el)}
                            style={{ display: 'flex' }}
                        >
                            {row.map((card, i) => (
                                <div
                                    key={card.type + card.id + i}
                                    style={{
                                        background: 'linear-gradient(145deg, #2d2d2d, #1a1a1a)',
                                        borderRadius: CARD_RADIUS,
                                        margin: `0 ${CARD_MARGIN}px`,
                                        padding: 0,
                                        width: CARD_WIDTH,
                                        height: CARD_HEIGHT,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        pointerEvents: 'none',
                                    }}
                                >
                                    {card.image ? (
                                        <img
                                            src={card.image}
                                            alt=""
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: CARD_RADIUS,
                                                filter: 'brightness(0.85)',
                                            }}
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', background: '#222', borderRadius: CARD_RADIUS }} />
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        <div style={{ display: 'flex' }}>
                            {row.map((card, i) => (
                                <div
                                    key={card.type + card.id + 'dup' + i}
                                    style={{
                                        background: 'linear-gradient(145deg, #2d2d2d, #1a1a1a)',
                                        borderRadius: CARD_RADIUS,
                                        margin: `0 ${CARD_MARGIN}px`,
                                        padding: 0,
                                        width: CARD_WIDTH,
                                        height: CARD_HEIGHT,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        pointerEvents: 'none',
                                    }}
                                >
                                    {card.image ? (
                                        <img
                                            src={card.image}
                                            alt=""
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: CARD_RADIUS,
                                                filter: 'brightness(0.85)',
                                            }}
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', background: '#222', borderRadius: CARD_RADIUS }} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnimatedBackdrop;
