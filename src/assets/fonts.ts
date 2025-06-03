export function loadCairoFont() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&display=swap';
    document.head.appendChild(link);
    
    document.documentElement.style.setProperty('--font-cairo', '"Cairo", sans-serif');
  }