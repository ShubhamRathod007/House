
    // Simple controller to trigger the animations in sequence (replayable)
    const buildBtn = document.getElementById('buildBtn');
    const resetBtn = document.getElementById('resetBtn');
    const stage = document.querySelector('.stage');

    function resetState() {
      // remove inlined animation styles by cloning the stage
      const clone = stage.cloneNode(true);
      stage.parentNode.replaceChild(clone, stage);
      // reattach event handlers
      attachHandlers(clone);
    }

    function attachHandlers(root = document) {
      const b = root.getElementById('buildBtn');
      const r = root.getElementById('resetBtn');
      const houseWrap = root.querySelector('#houseWrap');

      if (!b) return; // safety

      b.addEventListener('click', () => {
        // add small animated sequence using CSS animation delays for visual build
        // We simply toggle / re-add classes by forcing reflow and then setting styles
        const sun = root.querySelector('.sun');
        const clouds = [...root.querySelectorAll('.cloud')];
        const ground = root.querySelector('.ground');
        const roof = root.querySelector('.roof');
        const chimney = root.querySelector('.chimney');
        const wall = root.querySelector('.wall');
        const windows = [...root.querySelectorAll('.window')];
        const door = root.querySelector('.door');
        const path = root.querySelector('.path');
        const box = root.querySelector('.flower-box');
        const shadow = root.querySelector('.shadow');
        const craneParts = [...root.querySelectorAll('.crane .mast, .crane .arm, .crane .hook')];

        // Ensure everything is initially hidden (we'll re-add animations by toggling inline styles)
        const items = [sun, ...clouds, ground, roof, chimney, wall, ...windows, door, path, box, shadow, ...craneParts];
        items.forEach(el => {
          if (!el) return;
          el.style.opacity = 0;
          el.style.transform = 'translateY(12px) scale(.98)';
        });

        // staggered reveal
        const timeline = [
          {el: sun, delay: 300, props: {opacity:1, transform:'scale(1)'}},
          {el: clouds[0], delay: 420, props: {opacity:1, transform:'translateY(0)'}},
          {el: clouds[1], delay: 520, props: {opacity:1, transform:'translateY(0)'}},
          {el: ground, delay: 680, props: {opacity:1, transform:'translateY(0)'}},
          {el: craneParts[0], delay: 720, props: {opacity:1, transform:'translateY(0)'}},
          {el: craneParts[1], delay: 780, props: {opacity:1, transform:'translateY(0) rotate(0deg)'}},
          {el: craneParts[2], delay: 840, props: {opacity:1, transform:'translateY(0)'}},
          {el: roof, delay: 1000, props: {opacity:1, transform:'translateY(0)'}},
          {el: chimney, delay: 1120, props: {opacity:1, transform:'translateY(0) rotate(0deg)'}},
          {el: wall, delay: 1200, props: {opacity:1, transform:'translateY(0) scaleY(1)'}},
          {el: windows[0], delay: 1380, props: {opacity:1, transform:'translateY(0) scale(1)'}},
          {el: windows[1], delay: 1420, props: {opacity:1, transform:'translateY(0) scale(1)'}},
          {el: box, delay: 1560, props: {opacity:1, transform:'translateY(0)'}},
          {el: door, delay: 1600, props: {opacity:1, transform:'translateY(0)'}},
          {el: path, delay: 1700, props: {opacity:1, transform:'translateX(-50%) scaleX(1)'}},
          {el: shadow, delay: 1720, props: {opacity:1}},
        ];

        timeline.forEach(item => {
          if (!item.el) return;
          setTimeout(() => {
            Object.assign(item.el.style, item.props);
            item.el.style.transition = 'all 520ms cubic-bezier(.2,.9,.2,1)';
          }, item.delay);
        });
      });

      if (r) {
        r.addEventListener('click', () => {
          // reset by cloning root stage
          const currentStage = document.querySelector('.stage');
          const newClone = currentStage.cloneNode(true);
          currentStage.parentNode.replaceChild(newClone, currentStage);
          attachHandlers(newClone);
        });
      }
    }

    attachHandlers(document);

    // Auto play once when page loads
    window.addEventListener('load', () => {
      setTimeout(() => {
        const btn = document.getElementById('buildBtn');
        if (btn) btn.click();
      }, 420);
    });