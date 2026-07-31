import React, { useRef, useEffect } from "react";
import { testimonialPageStyles } from "../assets/dummyStyles";
import T1 from "../assets/T1.png";
import T2 from "../assets/T2.png";
import T3 from "../assets/T3.png";
import T4 from "../assets/T4.png";

const cards = [
  {
    id: 1,
    title: "“Elegance and Precision” — Anirudh N.",
    meta: "Anirudh N. • June 5, 2026",
    excerpt:
      "I gifted the Swarovski piece to myself and it instantly became my go-to. The crystal detailing catches light in the most flattering way and the movement keeps perfect time — classy enough for gala nights, subtle enough for daily wear.",
    image: T1,
  },
  {
    id: 2,
    title: "“Built Like a Tank” — Akshat S.",
    meta: "Akshat S. • July 21, 2026",
    excerpt:
      "I wear my G-Shock for work, gym and weekend hikes — zero scratches so far. The shock resistance and battery life are absurdly good. If you want a worry-free daily watch, this one's unbeatable.",
    image: T2,
  },
  {
    id: 3,
    title: "“Sleek & Subtle” — Atharv S.",
    meta: "Atharv S. • May 15, 2026",
    excerpt:
      "The minimalist dial is gorgeous — thin case, clean lines and a strap that feels premium. It pairs perfectly with both office blazers and weekend denim. I get compliments every time I wear it.",
    image: T3,
  },
  {
    id: 4,
    title: "“A Time Capsule” — Abhi P.",
    meta: "Abhi P. • May 2, 2026",
    excerpt:
      "A vintage look that still feels modern — the domed crystal and aged-lume give it character. It's become my conversation starter at dinners. Comfortable, well-built, and full of charm.",
    image: T4,
  },
];

const Testimonials = () => {
  const scroller = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const rafRef = useRef(null);
  const targetScroll = useRef(null);
  const lastMoveTime = useRef(0);
  const lastMoveX = useRef(0);
  const velocity = useRef(0);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    el.style.scrollBehavior = "auto";

    const handleUp = () => {
      isDown.current = false;
      el.classList && el.classList.remove("cursor-grabbing");
    };
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const ensureRafRunning = () => {
    if (rafRef.current) return;
    const el = scroller.current;
    if (!el) return;
    let last = performance.now();

    const loop = (now) => {
      const dt = now - last;
      last = now;
      // if no target set, stop RAF
      if (targetScroll.current == null) {
        rafRef.current = null;
        return;
      }

      const current = el.scrollLeft;
      const next = current + (targetScroll.current - current) * lerpAlpha;
      el.scrollLeft = next;

      // if we're close enough to target and not dragging, snap to target and stop RAF
      if (
        Math.abs(targetScroll.current - next) < 0.5 &&
        !isDown.current &&
        Math.abs(velocity.current) < 0.02
      ) {
        el.scrollLeft = targetScroll.current;
        // clear target and stop RAF
        targetScroll.current = null;
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
  };

  const startMomentum = () => {
    const el = scroller.current;
    if (!el) return;
    // if velocity very small, do nothing
    if (Math.abs(velocity.current) < 0.02) {
      velocity.current = 0;
      targetScroll.current = null;
      return;
    }

    targetScroll.current = el.scrollLeft;
    ensureRafRunning();

    let last = performance.now();
    const friction = 0.0008; // tuning: smaller = longer glide; larger = quicker stop

    const step = (now) => {
      const dt = now - last;
      last = now;

      targetScroll.current += velocity.current * dt;

      const factor = Math.exp(-friction * dt);
      velocity.current *= factor;

      // if velocity falls below threshold, stop
      if (Math.abs(velocity.current) > 0.02) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        // let RAF settle to final target then clear
        setTimeout(() => {
          targetScroll.current = Math.round(targetScroll.current);
          velocity.current = 0;
        }, 0);
        rafRef.current = null;
      }
    };

    if (rafRef.current) {
      // RAF already running for smoothing; kick off momentum step separately
      rafRef.current = requestAnimationFrame(step);
    } else {
      rafRef.current = requestAnimationFrame(step);
    }
  };

  const onMouseDown = (e) => {
    const el = scroller.current;
    if (!el) return;
    // cancel any momentum
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    isDown.current = true;
    el.classList.add("cursor-grabbing");

    // use clientX for consistency
    startX.current = e.clientX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;

    // init smoothing state
    targetScroll.current = el.scrollLeft;
    lastMoveTime.current = performance.now();
    lastMoveX.current = e.clientX;
    velocity.current = 0;

    ensureRafRunning();
  };

  const onMouseLeave = () => {
    isDown.current = false;
    scroller.current && scroller.current.classList.remove("cursor-grabbing");
    // on leave we compute momentum from last velocity
    startMomentum();
  };

  const onMouseUp = () => {
    isDown.current = false;
    scroller.current && scroller.current.classList.remove("cursor-grabbing");
    // start momentum based on recent velocity
    startMomentum();
  };

  const onMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const el = scroller.current;
    const x = e.clientX - el.offsetLeft;
    const walk = (x - startX.current) * 1;

    targetScroll.current = scrollLeft.current - walk;

    const now = performance.now();
    const dt = Math.max(1, now - lastMoveTime.current); // ms
    const instantV = (e.clientX - lastMoveX.current) / dt; // px/ms
    // smooth velocity to reduce jitter
    velocity.current = instantV * 0.6 + velocity.current * 0.4;
    lastMoveTime.current = now;
    lastMoveX.current = e.clientX;

    ensureRafRunning();
  };

  const onTouchStart = (e) => {
    const el = scroller.current;
    if (!el) return;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    isDown.current = true;
    startX.current = e.touches[0].clientX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;

    targetScroll.current = el.scrollLeft;
    lastMoveTime.current = performance.now();
    lastMoveX.current = e.touches[0].clientX;
    velocity.current = 0;

    ensureRafRunning();
  };

  const onTouchMove = (e) => {
    if (!isDown.current) return;
    const el = scroller.current;
    const x = e.touches[0].clientX - el.offsetLeft;
    const walk = (x - startX.current) * 1;

    targetScroll.current = scrollLeft.current - walk;

    const now = performance.now();
    const dt = Math.max(1, now - lastMoveTime.current);
    const instantV = (e.touches[0].clientX - lastMoveX.current) / dt;
    velocity.current = instantV * 0.6 + velocity.current * 0.4;
    lastMoveTime.current = now;
    lastMoveX.current = e.touches[0].clientX;

    ensureRafRunning();
  };

  const onTouchEnd = () => {
    isDown.current = false;
    scroller.current && scroller.current.classList.remove("cursor-grabbing");
    startMomentum();
  };

  // These all above functions are for smooth scrolling and momentum effect when dragging the testimonials horizontally.

  return (
    <section className={testimonialPageStyles.pageSection}>
      <div className={testimonialPageStyles.container}>
        <h2 className={testimonialPageStyles.title} style={{ fontFamily: "'Playfair Display', serif" }} >
          The Watch Journal
        </h2>

        <div
          className={testimonialPageStyles.scroller}
          ref={scroller}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-y",
          }}
        >
          {cards.map((card) => (
            <article key={card.id} className={testimonialPageStyles.card}>
              <div className={testimonialPageStyles.imageBlock}>
                <img src={card.image} alt={card.title} className={testimonialPageStyles.image} />
              </div>
              <div className={testimonialPageStyles.contentBlock}>
                <div>
                  <h3 className={testimonialPageStyles.cardTitle}>{card.title}</h3>
                  <p className={testimonialPageStyles.cardMeta}>{card.meta}</p>
                  <p className={testimonialPageStyles.cardExcerpt}>{card.excerpt}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style> {`${testimonialPageStyles.scrollbarHide}`} </style>
      
    </section>
  );
};

export default Testimonials;
