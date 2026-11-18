"use client";

import { useState } from "react";
import { Dialog } from "../components/dialog";

export default function DialogDemo() {
  const [open, setOpen] = useState(false);

  return <>
    <div className="ds-dialog-launcher">
      <button className="ds-btn ds-btn-primary" onClick={() => setOpen(true)}>Open dialog　↗</button>
      <span>Try the preview to see the overlay and focus state.</span>
    </div>
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      eyebrow="A LITTLE SOMETHING EXTRA"
      title={<>Fresh savings<br />are in season.</>}
      description="Join the Farmart market and enjoy 15% off your first basket of fresh favorites."
      actions={<>
        <button className="ds-btn ds-btn-primary" onClick={() => setOpen(false)}>Explore the offer　→</button>
        <button className="ds-dialog-later" onClick={() => setOpen(false)}>Maybe later</button>
      </>}
    >
      <span className="ds-dialog-note">NO PRESSURE. JUST GOOD PRODUCE.</span>
    </Dialog>
  </>;
}
