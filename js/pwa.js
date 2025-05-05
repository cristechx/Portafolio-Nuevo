// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('ServiceWorker registration successful');
        })
        .catch(err => {
          console.log('ServiceWorker registration failed: ', err);
        });
    });
  }
  
  // PWA Installation Prompt
  let deferredPrompt;
  const pwaInstallBtn = document.querySelector('.pwa-install-btn');
  
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    
    // Show the install button
    if (pwaInstallBtn) {
      pwaInstallBtn.style.display = 'block';
      
      pwaInstallBtn.addEventListener('click', () => {
        // Hide the install button
        pwaInstallBtn.style.display = 'none';
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          deferredPrompt = null;
        });
      });
    }
  });
  
  // Detect when app is installed
  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    // Hide install button
    if (pwaInstallBtn) {
      pwaInstallBtn.style.display = 'none';
    }
  });
  
  // Add meta tags for iOS
  const addIOSMeta = () => {
    const metas = [
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: 'CG Portfolio' }
    ];
    
    metas.forEach(meta => {
      const metaTag = document.createElement('meta');
      metaTag.name = meta.name;
      metaTag.content = meta.content;
      document.getElementsByTagName('head')[0].appendChild(metaTag);
    });
    
    // Add apple touch icon
    const appleTouchIcon = document.createElement('link');
    appleTouchIcon.rel = 'apple-touch-icon';
    appleTouchIcon.href = '/img/icon-192.png';
    document.getElementsByTagName('head')[0].appendChild(appleTouchIcon);
  };
  
  // Execute on load
  window.addEventListener('load', addIOSMeta);
  
  // Handle offline status
  window.addEventListener('online', () => {
    document.body.classList.remove('offline');
    showNotification('Conexión restablecida', 'success');
  });
  
  window.addEventListener('offline', () => {
    document.body.classList.add('offline');
    showNotification('Sin conexión a internet', 'warning');
  });
  
  // Show notifications
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--accent-color);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 9999;
      animation: slideUp 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
  
  // Add CSS for notifications
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideUp {
      from {
        transform: translate(-50%, 100%);
        opacity: 0;
      }
      to {
        transform: translate(-50%, 0);
        opacity: 1;
      }
    }
    
    .notification.success {
      background: #32CD32;
    }
    
    .notification.warning {
      background: #FF8C00;
    }
    
    .notification.error {
      background: #FF4444;
    }
    
    .offline {
      filter: grayscale(100%);
    }
    
    .offline .page-loader {
      opacity: 0.5;
    }
  `;
  document.head.appendChild(style);
  
  // Check for updates
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      showNotification('Nueva versión disponible. Recargando...', 'success');
      window.location.reload();
    });
  }