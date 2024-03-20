import { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import dayjs from 'dayjs'

export function TypedH2() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['告诉我你今天的心情', dayjs().format('YYYY-MM-DD')],
      typeSpeed: 50,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <h2
      className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-muted-foreground"
    >
      <span ref={el} />
    </h2>
  )
}