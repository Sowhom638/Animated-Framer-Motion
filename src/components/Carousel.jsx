import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";

export default function Carousel({ title, items }) {
  const scrollRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const observerRef = useRef(null);
  const visibleItemsRef = useRef(new Set());

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const imageRef = useCallback((node) => {
    if (node && observerRef.current) {
      observerRef.current.observe(node);
    }
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          if (entry.isIntersecting) {
            visibleItemsRef.current.add(index);
          } else {
            visibleItemsRef.current.delete(index);
          }
        });

        const totalItems = items.length;
        if (totalItems === 0) {
          setCanScrollLeft(false);
          setCanScrollRight(false);
          return;
        }

        setCanScrollLeft(!visibleItemsRef.current.has(0));
        setCanScrollRight(!visibleItemsRef.current.has(totalItems - 1));
      },
      {
        root: scrollRef.current,
        threshold: 0.99,
      },
    );

    const nodes = scrollRef.current.querySelectorAll("[data-index]");
    nodes.forEach((node) => observerRef.current.observe(node));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const firstCard = scrollRef.current.querySelector("[data-index]");
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth;
      const scrollAmount = cardWidth * (direction === "left" ? -1 : 1);

      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeoutRef.current);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 300);
  };

  useEffect(() => {
    return () => clearTimeout(hoverTimeoutRef.current);
  }, []);

  return (
    <CarouselContainer $isHovering={isHovering}>
      <Title>{title}</Title>
      <CarouselContent>
        {canScrollLeft && <GradientOverlayLeft $isVisible={isHovering} />}
        {canScrollRight && <GradientOverlayRight $isVisible={isHovering} />}

        {canScrollLeft && (
          <SlideButton
            $direction="left"
            $isVisible={isHovering}
            onClick={() => scroll("left")}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ChevronLeft />
          </SlideButton>
        )}

        {canScrollRight && (
          <SlideButton
            $direction="right"
            $isVisible={isHovering}
            onClick={() => scroll("right")}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ChevronRight />
          </SlideButton>
        )}

        <ScrollWrapper ref={scrollRef}>
          <CardsTrack
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {items?.map((item, index) => (
              <CardWrapper
                key={index}
                $isFirst={index === 0}
                $isLast={index === items.length - 1}
              >
                <CardImage
                  src={
                    item.thumbnail ||
                    "/canelaTv/featured-section/featured-section-placeholder-img.png"
                  }
                  alt={item.title}
                  ref={imageRef}
                  data-index={index}
                />
                {item.isLive && <LiveBadge>En Vivo</LiveBadge>}
              </CardWrapper>
            ))}
          </CardsTrack>
        </ScrollWrapper>
      </CarouselContent>
    </CarouselContainer>
  );
}

const Title = styled.h2`
  color: #fff;
  font-size: 1.2rem;
  margin-top: -4.5rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
  padding-left: 1.3rem;

  @media (min-width: 900px) {
    padding-left: 71px;
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
`;

const CarouselContent = styled.div`
  position: relative;
  margin-bottom: 3.3rem;
`;

const CardWrapper = styled.div`
  flex: 0 0 auto;
  position: relative;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  border: 2px solid transparent;
  transition:
    all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  /* Responsive width calculations - NO OVERLAP */
  /* Mobile (< 500px): 2 cards and 1/3 of 3rd card */
  width: calc((100vw - 1.3rem - 0.8rem) / 2.2);

  @media (min-width: 500px) and (max-width: 999px) {
    /* Tablet (500px - 999px): 3 cards and 1/3 of 4th card */
    width: calc((100vw - 1.3rem - 1.2rem) / 3.3);
  }

  @media (min-width: 1000px) {
    /* Desktop (>= 900px): 5 cards and 1/3 of 6th card */
    width: calc((100vw - 71px - 2rem) / 5.3);
  }
  @media (min-width: 900px){
  &:hover {
    transform: scale(1.15);
    border-color: #e50914;
    z-index: 10;
  }

  /* Fix transform origin for edge cards */
  ${({ $isFirst }) =>
    $isFirst &&
    `
    &:hover {
      transform-origin: left center;
    }
  `}

  ${({ $isLast }) =>
    $isLast &&
    `
    &:hover {
      transform-origin: right center;
    }
  `}
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const LiveBadge = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.95);
  color: #000;
  padding: 2px 4px;
  border-radius: 2px;
  font-size: 0.6rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 2;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    background-color: #e50914;
    border-radius: 50%;
  }

  @media (min-width: 900px) {
    font-size: 0.8rem;
    padding: 4px 12px;
    border-radius: 4px;
  }
`;

const SlideButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background-color: rgba(34, 34, 34, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    opacity 0.3s ease,
    transform 0.2s ease,
    background-color 0.2s ease;

  ${({ $direction }) =>
    $direction === "left" ? "left: 10px;" : "right: 10px;"}
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};

  &:hover {
    background-color: rgba(60, 60, 60, 1);
    transform: translateY(-50%) scale(1.1);
  }

  svg {
    width: 20px;
    height: 20px;
    fill: none;
    stroke: #ffffff;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  @media (min-width: 900px) {
    width: 40px;
    height: 40px;
    top: 45%;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const GradientOverlayLeft = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 60px;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.6) 40%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 2;
  pointer-events: none;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;

  @media (min-width: 900px) {
    width: 100px;
  }
`;

const GradientOverlayRight = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 60px;
  background: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.6) 40%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 2;
  pointer-events: none;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;

  @media (min-width: 900px) {
    width: 100px;
  }
`;

const ScrollWrapper = styled.div`
  overflow-x: auto;
  scrollbar-width: none;
  padding-left: 1.3rem;
  padding-right: 1.3rem;

  /* Extra padding for zoom effect */
  padding-top: 30px;
  padding-bottom: 30px;
  margin-top: -30px;
  margin-bottom: -30px;

  @media (min-width: 900px) {
    padding-left: 71px;
    padding-right: 71px;
    padding-top: 40px;
    padding-bottom: 40px;
    margin-top: -40px;
    margin-bottom: -40px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardsTrack = styled.div`
  display: flex;
  gap: 0.4rem;
  width: max-content; /* Prevents overflow issues */
`;

const CarouselContainer = styled.section`
  position: relative;
  margin-bottom: 2rem;
  z-index: ${({ $isHovering }) => ($isHovering ? 90 : 1)};
`;