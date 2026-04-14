document.addEventListener('DOMContentLoaded', function() {
    // ========== PARTÍCULAS E MORCEGOS (VISÍVEIS, MAIS RÁPIDOS, CORPO EXPOSTO) ==========
    const canvas = document.getElementById('particulas-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particulas = [];
        let morcegos = [];
        let wingPhaseGlobal = 0;
        const wingSpeed = 0.04; // batimento um pouco mais rápido

        function init() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            particulas = [];
            for (let i = 0; i < 40; i++) {
                particulas.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    raio: Math.random() * 3 + 1,
                    velX: (Math.random() - 0.5) * 0.25,
                    velY: (Math.random() - 0.5) * 0.25,
                    cor: `rgba(180, 60, 60, ${0.2 + Math.random()*0.4})`
                });
            }

            // 12 morcegos com velocidades bem variadas
            morcegos = [];
            for (let i = 0; i < 12; i++) {
                morcegos.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    tamanho: 35 + Math.random() * 25,
                    velX: (Math.random() - 0.5) * (0.5 + Math.random() * 1.2), // alguns bem rápidos
                    velY: (Math.random() - 0.5) * (0.3 + Math.random() * 0.8),
                    direcao: Math.random() > 0.5 ? 1 : -1,
                    corPelo: `hsl(${20 + Math.random()*15}, ${40 + Math.random()*20}%, ${12 + Math.random()*8}%)`,
                    corAsa: `hsl(${10 + Math.random()*20}, ${30 + Math.random()*20}%, ${8 + Math.random()*6}%)`,
                });
            }
        }

        function desenhaCorpo(ctx, tamanho, corPelo) {
            ctx.shadowColor = '#000000';
            ctx.shadowBlur = 12;
            ctx.shadowOffsetY = 2;

            const bodyGrad = ctx.createRadialGradient(-5, -5, 2, 0, 0, tamanho*0.5);
            bodyGrad.addColorStop(0, corPelo);
            bodyGrad.addColorStop(0.7, '#0a0505');
            ctx.beginPath();
            ctx.ellipse(0, 0, tamanho*0.25, tamanho*0.45, 0, 0, Math.PI*2);
            ctx.fillStyle = bodyGrad;
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.shadowOffsetY = 0;
            ctx.strokeStyle = '#2a1a18';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.save();
            ctx.clip();
            ctx.strokeStyle = '#3a2824';
            ctx.lineWidth = 0.8;
            for (let i = -tamanho*0.2; i <= tamanho*0.2; i+=4) {
                ctx.beginPath();
                ctx.moveTo(i, -tamanho*0.3);
                ctx.lineTo(i+1, -tamanho*0.35);
                ctx.stroke();
            }
            ctx.restore();

            ctx.save();
            ctx.translate(0, -tamanho*0.25);
            ctx.beginPath();
            ctx.ellipse(0, 0, tamanho*0.16, tamanho*0.14, 0, 0, Math.PI*2);
            ctx.fillStyle = corPelo;
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.strokeStyle = '#2a1a18';
            ctx.lineWidth = 1.2;
            ctx.stroke();

            ctx.beginPath();
            ctx.ellipse(0, tamanho*0.06, tamanho*0.1, tamanho*0.08, 0, 0, Math.PI*2);
            ctx.fillStyle = '#1c100c';
            ctx.fill();
            ctx.strokeStyle = '#3a241e';
            ctx.stroke();

            ctx.fillStyle = '#050201';
            ctx.beginPath();
            ctx.arc(-tamanho*0.04, tamanho*0.05, tamanho*0.015, 0, Math.PI*2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(tamanho*0.04, tamanho*0.05, tamanho*0.015, 0, Math.PI*2);
            ctx.fill();

            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.ellipse(-tamanho*0.07, -tamanho*0.02, tamanho*0.04, tamanho*0.045, 0, 0, Math.PI*2);
            ctx.fillStyle = '#030101';
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(tamanho*0.07, -tamanho*0.02, tamanho*0.04, tamanho*0.045, 0, 0, Math.PI*2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(-tamanho*0.07, -tamanho*0.02, tamanho*0.025, 0, Math.PI*2);
            ctx.fillStyle = '#5a1010';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(tamanho*0.07, -tamanho*0.02, tamanho*0.025, 0, Math.PI*2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(-tamanho*0.07, -tamanho*0.02, tamanho*0.012, 0, Math.PI*2);
            ctx.fillStyle = '#000000';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(tamanho*0.07, -tamanho*0.02, tamanho*0.012, 0, Math.PI*2);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(-tamanho*0.08, -tamanho*0.03, tamanho*0.005, 0, Math.PI*2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(tamanho*0.06, -tamanho*0.03, tamanho*0.005, 0, Math.PI*2);
            ctx.fill();

            ctx.fillStyle = '#150a08';
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.moveTo(-tamanho*0.12, -tamanho*0.08);
            ctx.lineTo(-tamanho*0.3, -tamanho*0.3);
            ctx.lineTo(-tamanho*0.1, -tamanho*0.22);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = '#2a1814';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(-tamanho*0.14, -tamanho*0.12);
            ctx.lineTo(-tamanho*0.24, -tamanho*0.25);
            ctx.lineTo(-tamanho*0.12, -tamanho*0.2);
            ctx.closePath();
            ctx.fillStyle = '#0c0504';
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(tamanho*0.12, -tamanho*0.08);
            ctx.lineTo(tamanho*0.3, -tamanho*0.3);
            ctx.lineTo(tamanho*0.1, -tamanho*0.22);
            ctx.closePath();
            ctx.fillStyle = '#150a08';
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(tamanho*0.14, -tamanho*0.12);
            ctx.lineTo(tamanho*0.24, -tamanho*0.25);
            ctx.lineTo(tamanho*0.12, -tamanho*0.2);
            ctx.closePath();
            ctx.fillStyle = '#0c0504';
            ctx.fill();

            ctx.restore();
        }

        function desenhaAsa(ctx, tamanho, wingAngle, corAsa, isLeft) {
            const angle = -0.7 + wingAngle * 1.8; // mais amplitude
            
            ctx.save();
            const pivotX = isLeft ? -tamanho*0.2 : tamanho*0.2;
            const pivotY = -tamanho*0.1;
            ctx.translate(pivotX, pivotY);
            ctx.rotate(angle);
            
            ctx.shadowColor = '#1a0000';
            ctx.shadowBlur = 10;
            
            const grad = ctx.createLinearGradient(0, 0, -tamanho*0.9, -tamanho*0.2);
            grad.addColorStop(0, corAsa);
            grad.addColorStop(0.7, '#0f0806');
            
            ctx.fillStyle = grad;
            ctx.strokeStyle = '#3a201c';
            ctx.lineWidth = 1.8;
            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(-tamanho*0.3, -tamanho*0.5, -tamanho*0.8, -tamanho*0.4);
            ctx.lineTo(-tamanho*1.0, -tamanho*0.15);
            ctx.quadraticCurveTo(-tamanho*0.6, -tamanho*0.05, -tamanho*0.5, tamanho*0.15);
            ctx.lineTo(-tamanho*0.65, tamanho*0.3);
            ctx.quadraticCurveTo(-tamanho*0.3, tamanho*0.2, 0, tamanho*0.35);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            
            ctx.shadowBlur = 0;
            ctx.strokeStyle = '#2a1814';
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-tamanho*0.4, -tamanho*0.25);
            ctx.lineTo(-tamanho*0.8, -tamanho*0.2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(-tamanho*0.4, -tamanho*0.25);
            ctx.lineTo(-tamanho*0.6, tamanho*0.1);
            ctx.stroke();
            
            ctx.strokeStyle = '#4a2820';
            ctx.lineWidth = 0.8;
            for (let i=0; i<4; i++) {
                const off = i * 0.12;
                ctx.beginPath();
                ctx.moveTo(-tamanho*0.1, -tamanho*0.05 + off*tamanho);
                ctx.lineTo(-tamanho*0.5, -tamanho*0.3 + off*tamanho*0.4);
                ctx.stroke();
            }
            
            ctx.fillStyle = '#1a100c';
            ctx.beginPath();
            ctx.ellipse(-tamanho*1.0, -tamanho*0.12, 2.5, 4, 0.2, 0, Math.PI*2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(-tamanho*0.65, tamanho*0.32, 2, 3.5, -0.1, 0, Math.PI*2);
            ctx.fill();
            
            ctx.restore();
        }

        function desenhaMorcego(ctx, x, y, tamanho, wingAngle, direcao, corPelo, corAsa) {
            ctx.save();
            ctx.translate(x, y);
            if (direcao < 0) ctx.scale(-1, 1);

            desenhaAsa(ctx, tamanho, wingAngle, corAsa, true);
            desenhaAsa(ctx, tamanho, wingAngle, corAsa, false);
            desenhaCorpo(ctx, tamanho, corPelo);

            ctx.shadowBlur = 0;
            ctx.fillStyle = '#1a100c';
            ctx.beginPath();
            ctx.ellipse(-tamanho*0.1, tamanho*0.35, 3, 5, 0, 0, Math.PI*2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(tamanho*0.1, tamanho*0.35, 3, 5, 0, 0, Math.PI*2);
            ctx.fill();

            ctx.restore();
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);

            particulas.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.raio, 0, Math.PI*2);
                ctx.fillStyle = p.cor;
                ctx.fill();
                p.x += p.velX;
                p.y += p.velY;
                if (p.x < 0 || p.x > width) p.velX *= -1;
                if (p.y < 0 || p.y > height) p.velY *= -1;
            });

            wingPhaseGlobal += wingSpeed;
            const wingAngle = 0.5 + 0.5 * Math.sin(wingPhaseGlobal);

            morcegos.forEach(m => {
                desenhaMorcego(ctx, m.x, m.y, m.tamanho, wingAngle, m.direcao, m.corPelo, m.corAsa);
                m.x += m.velX;
                m.y += m.velY;
                if (m.x < -120) m.x = width + 120;
                if (m.x > width + 120) m.x = -120;
                if (m.y < -120) m.y = height + 120;
                if (m.y > height + 120) m.y = -120;
            });

            requestAnimationFrame(draw);
        }

        window.addEventListener('resize', () => init());
        init();
        draw();
    }

    // ========== TOOLTIP GÓTICAS ==========
    const goticasMenu = document.getElementById('goticas-menu');
    if (goticasMenu) {
        fetch('/api/goticas/')
            .then(response => response.json())
            .then(data => {
                goticasMenu.innerHTML = '';
                data.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a class="dropdown-item" href="/?categoria=${item.valor}">${item.label}</a>`;
                    goticasMenu.appendChild(li);
                });
                if (data.length === 0) {
                    goticasMenu.innerHTML = '<li><span class="dropdown-item-text">Nenhuma gótica encontrada</span></li>';
                }
            })
            .catch(() => goticasMenu.innerHTML = '<li><span class="dropdown-item-text">Erro</span></li>');
    }

    // ========== PESQUISA COM SUGESTÕES ==========
    const searchInput = document.getElementById('search-input');
    const suggestionsDiv = document.getElementById('search-suggestions');
    if (searchInput && suggestionsDiv) {
        let timeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(timeout);
            const termo = this.value.trim();
            if (termo.length < 2) {
                suggestionsDiv.style.display = 'none';
                return;
            }
            timeout = setTimeout(() => {
                fetch(`/api/sugestoes/?q=${encodeURIComponent(termo)}`)
                    .then(r => r.json())
                    .then(data => {
                        suggestionsDiv.innerHTML = '';
                        if (data.length === 0) {
                            suggestionsDiv.innerHTML = '<span class="dropdown-item-text">🦇 Gótica não encontrada...</span>';
                        } else {
                            data.forEach(item => {
                                const a = document.createElement('a');
                                a.className = 'dropdown-item';
                                a.href = item.tipo === 'categoria' ? `/?categoria=${item.valor}` : `/artigo/${item.id}/`;
                                a.textContent = item.label || item.titulo;
                                suggestionsDiv.appendChild(a);
                            });
                        }
                        suggestionsDiv.style.display = 'block';
                    })
                    .catch(() => {
                        suggestionsDiv.innerHTML = '<span class="dropdown-item-text">Erro</span>';
                        suggestionsDiv.style.display = 'block';
                    });
            }, 300);
        });
        document.addEventListener('click', e => {
            if (!searchInput.contains(e.target) && !suggestionsDiv.contains(e.target))
                suggestionsDiv.style.display = 'none';
        });
    }

    // ========== ÁUDIO COMENTADO ==========
    /*
    const comentarBtn = document.getElementById('comentar-btn');
    if (comentarBtn) {
        comentarBtn.addEventListener('click', function(e) {
            const form = this.closest('form');
            if (form && form.checkValidity()) {
                new Audio('/static/noticias/audio/comment-sound.mp3').play()
                    .catch(e => console.log('Áudio não reproduzido'));
            }
        });
    }
    */
});