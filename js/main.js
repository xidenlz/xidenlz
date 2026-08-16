/**
 * Musaed - Technical Portfolio & Security Research Blog
 * Client-side utilities and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.innerHTML = isOpen 
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('is-open')) {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });
  }

  // Add Copy Buttons to Code Blocks
  const codeBlocks = document.querySelectorAll('.code-block');
  codeBlocks.forEach(block => {
    const header = block.querySelector('.code-header');
    const pre = block.querySelector('pre');
    
    if (header && pre) {
      const copyBtn = document.createElement('button');
      copyBtn.className = 'code-copy-btn';
      copyBtn.type = 'button';
      copyBtn.innerText = 'Copy';
      copyBtn.setAttribute('aria-label', 'Copy code snippet');

      copyBtn.addEventListener('click', async () => {
        const text = pre.innerText;
        try {
          await navigator.clipboard.writeText(text);
          copyBtn.innerText = 'Copied!';
          copyBtn.style.color = 'var(--accent-cyan)';
          setTimeout(() => {
            copyBtn.innerText = 'Copy';
            copyBtn.style.color = '';
          }, 2000);
        } catch (err) {
          copyBtn.innerText = 'Failed';
          setTimeout(() => {
            copyBtn.innerText = 'Copy';
          }, 2000);
        }
      });

      header.appendChild(copyBtn);
    }
  });

  // Reading progress indicator for deep research write-ups
  const article = document.querySelector('.article-content');
  if (article) {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '2px';
    progressBar.style.backgroundColor = 'var(--accent-cyan)';
    progressBar.style.zIndex = '999';
    progressBar.style.width = '0%';
    progressBar.style.transition = 'width 0.1s ease';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const totalHeight = article.clientHeight;
      const windowHeight = window.innerHeight;
      const scrollPos = window.scrollY - article.offsetTop + 100;
      
      if (scrollPos > 0 && totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollPos / totalHeight) * 100));
        progressBar.style.width = `${progress}%`;
      } else {
        progressBar.style.width = '0%';
      }
    });
  }
});
