"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

export type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: string;
  eyebrow?: string;
  children?: ReactNode;
  actions?: ReactNode;
};

/** Accessible, reusable modal dialog styled with the Farmart design tokens. */
export function Dialog({
  open,
  onClose,
  title,
  description,
  eyebrow,
  children,
  actions,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="ds-dialog"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current?.close();
      }}
    >
      <button className="ds-dialog-close" aria-label="Close dialog" onClick={() => dialogRef.current?.close()}>
        ×
      </button>
      <span className="ds-dialog-mark" aria-hidden="true">✦</span>
      {eyebrow && <small className="ds-dialog-eyebrow">{eyebrow}</small>}
      <h2 id={titleId}>{title}</h2>
      {description && <p>{description}</p>}
      {children}
      {actions && <div className="ds-dialog-actions">{actions}</div>}
    </dialog>
  );
}
