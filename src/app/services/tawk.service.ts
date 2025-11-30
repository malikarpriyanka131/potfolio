import { Injectable } from '@angular/core';

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: any;
  }
}

@Injectable({ providedIn: 'root' })
export class TawkService {
  private scriptElement: HTMLScriptElement | null = null;
  private propertyId: string | undefined;

  /**
   * Load the tawk.to widget. Provide the propertyId like `1234567890abcdef12345678`.
   * If you included the inline script in `index.html`, calling this is a no-op.
   */
  load(propertyId: string) {
    if (!propertyId) return;
    this.propertyId = propertyId;
    if ((window as any).Tawk_API) return; // already loaded

    const s = document.createElement('script');
    s.async = true;
    s.src = `https://embed.tawk.to/${propertyId}/default`;
    s.charset = 'UTF-8';
    s.setAttribute('crossorigin', '*');
    this.scriptElement = s;

    const first = document.getElementsByTagName('script')[0];
    if (first && first.parentNode) {
      first.parentNode.insertBefore(s, first);
    } else {
      document.head.appendChild(s);
    }
  }

  /** Hide the widget if available */
  hide() {
    if (window.Tawk_API && typeof window.Tawk_API.hideWidget === 'function') {
      window.Tawk_API.hideWidget();
    }
  }

  /** Show the widget if available */
  show() {
    if (window.Tawk_API && typeof window.Tawk_API.showWidget === 'function') {
      window.Tawk_API.showWidget();
    }
  }

  /** Toggle widget visibility */
  toggle() {
    if (!window.Tawk_API) return;
    try {
      // simple heuristic: check if hideWidget exists and assume widget is visible
      if (typeof window.Tawk_API.isChatHidden === 'function') {
        const hidden = window.Tawk_API.isChatHidden();
        hidden ? this.show() : this.hide();
      } else if (typeof window.Tawk_API.hideWidget === 'function') {
        // call hide if available (no reliable isVisible API)
        this.hide();
      }
    } catch (e) {
      // ignore
    }
  }

  /** Remove the injected script and attempt to clean widget nodes (best-effort) */
  unload() {
    if (this.scriptElement && this.scriptElement.parentNode) {
      this.scriptElement.parentNode.removeChild(this.scriptElement);
    }
    // best-effort removal of tawk elements
    const el = document.querySelector('[id^="tawk"]') as HTMLElement | null;
    if (el && el.parentNode) el.parentNode.removeChild(el);
    if ((window as any).Tawk_API) {
      try {
        delete (window as any).Tawk_API;
        delete (window as any).Tawk_LoadStart;
      } catch (err) {
        // ignore
      }
    }
    this.scriptElement = null;
  }
}

export default TawkService;
