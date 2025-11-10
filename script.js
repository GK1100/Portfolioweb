// AI Core Portfolio - Advanced Generative AI Interface
class AICorePortfolio {
    constructor() {
        this.currentSection = 'home';
        this.neuralCanvas = null;
        this.neuralCtx = null;
        this.animationId = null;
        this.isLoading = true;
        this.generativeText = '';
        this.textIndex = 0;
        this.textSpeed = 50;
        
        // AI Quotes collection
        this.aiQuotes = [
            {
                text: "The future of AI is not about replacing humans, but about amplifying human potential.",
                author: "AI Vision"
            },
            {
                text: "Artificial Intelligence is the new electricity. It will transform every industry.",
                author: "Andrew Ng"
            },
            {
                text: "AI is the most important technology humanity is working on. It's more profound than fire or electricity.",
                author: "Sundar Pichai"
            },
            {
                text: "The goal of AI is to create machines that can think, learn, and adapt like humans.",
                author: "AI Research"
            },
            {
                text: "AI will be the best or worst thing ever for humanity. We need to get it right.",
                author: "Stephen Hawking"
            },
            {
                text: "Machine learning is the key to unlocking the potential of artificial intelligence.",
                author: "Tech Innovation"
            },
            {
                text: "AI is not just about automation, it's about augmentation and enhancement.",
                author: "Future Tech"
            },
            {
                text: "The question is not whether AI will be smarter than humans, but how we can work together.",
                author: "AI Collaboration"
            },
            {
                text: "Every time we teach a machine to learn, we learn something new about learning itself.",
                author: "Machine Learning"
            },
            {
                text: "AI is the science of making machines do things that would require intelligence if done by humans.",
                author: "AI Definition"
            }
        ];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeCanvases();
        this.createNeuralNetwork();
        this.startLoadingSequence();
        
        // Start animations
        this.animateNeuralNetwork();
        this.startGenerativeText();
        
        // Display random quote
        this.displayRandomQuote();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.command-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.navigateToSection(section);
            });
        });

        // Mobile navigation toggle
        const commandToggle = document.getElementById('commandToggle');
        const commandMenu = document.getElementById('commandMenu');
        
        if (commandToggle) {
            commandToggle.addEventListener('click', () => {
                commandToggle.classList.toggle('active');
                commandMenu.classList.toggle('active');
            });
        }

        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission();
            });
        }

        // Pipeline node interactions
        document.querySelectorAll('.pipeline-node').forEach(node => {
            node.addEventListener('mouseenter', (e) => {
                this.activatePipelineNode(e.currentTarget);
            });
            
            node.addEventListener('mouseleave', () => {
                this.deactivatePipelineNode();
            });
        });

        // Skill category interactions
        document.querySelectorAll('.skill-category').forEach(category => {
            category.addEventListener('mouseenter', (e) => {
                this.activateSkillCategory(e.currentTarget);
            });
            
            category.addEventListener('mouseleave', () => {
                this.deactivateSkillCategory();
            });
        });

        // Publication card interactions
        document.querySelectorAll('.publication-card').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.activatePublicationCard(e.currentTarget);
            });
            
            card.addEventListener('mouseleave', () => {
                this.deactivatePublicationCard();
            });
        });

        // HELLO letter interactions
        document.querySelectorAll('.hello-letter').forEach(letter => {
            letter.addEventListener('mouseenter', (e) => {
                this.activateHelloLetter(e.currentTarget);
            });
            
            letter.addEventListener('mouseleave', () => {
                this.deactivateHelloLetter(e.currentTarget);
            });
        });

        // Data stream interactions
        const dataStream = document.getElementById('dataStream');
        if (dataStream) {
            dataStream.addEventListener('mouseenter', () => {
                this.activateDataStream();
            });
            
            dataStream.addEventListener('mouseleave', () => {
                this.deactivateDataStream();
            });
        }
    }

    initializeCanvases() {
        // Neural network background canvas
        this.neuralCanvas = document.getElementById('neuralCanvas');
        if (this.neuralCanvas) {
            this.neuralCtx = this.neuralCanvas.getContext('2d');
            this.resizeNeuralCanvas();
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            this.resizeNeuralCanvas();
        });
    }

    resizeNeuralCanvas() {
        if (this.neuralCanvas) {
            this.neuralCanvas.width = window.innerWidth;
            this.neuralCanvas.height = window.innerHeight;
        }
    }

    createNeuralNetwork() {
        this.neuralNodes = [];
        this.neuralConnections = [];
        
        const nodeCount = 20;
        const connectionCount = 35;

        // Create nodes
        for (let i = 0; i < nodeCount; i++) {
            this.neuralNodes.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                radius: Math.random() * 4 + 2,
                pulse: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.02 + 0.01,
                connections: [],
                type: Math.random() > 0.5 ? 'cyan' : 'violet'
            });
        }

        // Create connections
        for (let i = 0; i < connectionCount; i++) {
            const node1 = this.neuralNodes[Math.floor(Math.random() * this.neuralNodes.length)];
            const node2 = this.neuralNodes[Math.floor(Math.random() * this.neuralNodes.length)];
            
            if (node1 !== node2) {
                this.neuralConnections.push({
                    from: node1,
                    to: node2,
                    pulse: Math.random() * Math.PI * 2,
                    speed: Math.random() * 0.03 + 0.01,
                    type: Math.random() > 0.5 ? 'cyan' : 'violet'
                });
            }
        }
    }

    animateNeuralNetwork() {
        if (!this.neuralCtx) return;

        // Clear canvas
        this.neuralCtx.clearRect(0, 0, this.neuralCanvas.width, this.neuralCanvas.height);

        // Update node positions
        this.neuralNodes.forEach(node => {
            node.pulse += node.speed;
            node.x += Math.sin(node.pulse) * 0.3;
            node.y += Math.cos(node.pulse) * 0.3;

            // Keep nodes within bounds
            node.x = Math.max(0, Math.min(window.innerWidth, node.x));
            node.y = Math.max(0, Math.min(window.innerHeight, node.y));
        });

        // Draw connections
        this.neuralConnections.forEach(connection => {
            connection.pulse += connection.speed;
            
            const distance = Math.sqrt(
                Math.pow(connection.to.x - connection.from.x, 2) + 
                Math.pow(connection.to.y - connection.from.y, 2)
            );

            if (distance < 250) {
                const opacity = (250 - distance) / 250 * 0.4;
                const pulse = Math.sin(connection.pulse) * 0.5 + 0.5;
                
                const color = connection.type === 'cyan' ? 
                    `rgba(0, 212, 255, ${opacity * pulse})` : 
                    `rgba(139, 92, 246, ${opacity * pulse})`;
                
                this.neuralCtx.strokeStyle = color;
                this.neuralCtx.lineWidth = 1;
                this.neuralCtx.beginPath();
                this.neuralCtx.moveTo(connection.from.x, connection.from.y);
                this.neuralCtx.lineTo(connection.to.x, connection.to.y);
                this.neuralCtx.stroke();
            }
        });

        // Draw nodes
        this.neuralNodes.forEach(node => {
            const pulse = Math.sin(node.pulse) * 0.5 + 0.5;
            
            // Outer glow
            const gradient = this.neuralCtx.createRadialGradient(
                node.x, node.y, 0, node.x, node.y, node.radius * 4
            );
            
            const glowColor = node.type === 'cyan' ? 
                `rgba(0, 212, 255, ${0.3 * pulse})` : 
                `rgba(139, 92, 246, ${0.3 * pulse})`;
            
            gradient.addColorStop(0, glowColor);
            gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
            
            this.neuralCtx.fillStyle = gradient;
            this.neuralCtx.beginPath();
            this.neuralCtx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
            this.neuralCtx.fill();

            // Core
            const coreColor = node.type === 'cyan' ? 
                `rgba(0, 212, 255, ${0.8 * pulse})` : 
                `rgba(139, 92, 246, ${0.8 * pulse})`;
            
            this.neuralCtx.fillStyle = coreColor;
            this.neuralCtx.beginPath();
            this.neuralCtx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.neuralCtx.fill();
        });

        this.animationId = requestAnimationFrame(() => this.animateNeuralNetwork());
    }

    startGenerativeText() {
        const fullText = "Hi, I'm Gaurav Kumavat, a final-year B.Tech (CSE - AI & ML) student, with substantial practice in machine learning, deep learning, and computer vision. Published researcher who identifies complex problems and implements solutions that advance AI applications. Skilled in Python, and emerging generative-AI tools. Motivated to apply this technical foundation to forward-looking projects in industry.";
        
        const textElement = document.getElementById('generativeText');
        if (!textElement) return;

        const typeWriter = () => {
            if (this.textIndex < fullText.length) {
                this.generativeText += fullText.charAt(this.textIndex);
                textElement.innerHTML = this.generativeText + '<span class="text-cursor">|</span>';
                this.textIndex++;
                setTimeout(typeWriter, this.textSpeed);
            } else {
                // Remove cursor after completion
                setTimeout(() => {
                    textElement.innerHTML = this.generativeText;
                }, 1000);
            }
        };

        // Start typing after a delay
        setTimeout(typeWriter, 1000);
    }

    navigateToSection(section) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(s => {
            s.classList.remove('active');
        });

        // Show selected section
        const targetSection = document.getElementById(`${section}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = section;
            
            // Update navigation
            document.querySelectorAll('.command-item').forEach(item => {
                item.classList.remove('active');
            });
            
            const activeNavItem = document.querySelector(`[data-section="${section}"]`);
            if (activeNavItem) {
                activeNavItem.classList.add('active');
            }
            

        }
    }



    activatePipelineNode(node) {
        const projectType = node.dataset.project;
        
        // Add glow effect to related skills
        document.querySelectorAll('.tech-tag').forEach(tag => {
            if (node.querySelector('.tech-tag').textContent === tag.textContent) {
                tag.style.boxShadow = '0 0 20px var(--glow-cyan)';
                tag.style.transform = 'scale(1.1)';
            }
        });
        
        // Add pulse effect to node
        node.style.animation = 'glowPulse 1s ease-in-out infinite';
        
        // Animate connection points
        const connectionPoints = node.querySelectorAll('.connection-point');
        connectionPoints.forEach(point => {
            point.style.animation = 'pointPulse 0.5s ease-in-out infinite';
        });
    }

    deactivatePipelineNode() {
        document.querySelectorAll('.tech-tag').forEach(tag => {
            tag.style.boxShadow = '';
            tag.style.transform = '';
        });
        
        document.querySelectorAll('.pipeline-node').forEach(node => {
            node.style.animation = '';
        });
        
        document.querySelectorAll('.connection-point').forEach(point => {
            point.style.animation = 'pointPulse 3s ease-in-out infinite';
        });
    }

    activateSkillCategory(category) {
        const categoryType = category.dataset.category;
        
        // Add glow effect to related project technologies
        document.querySelectorAll('.pipeline-node').forEach(node => {
            const techTags = node.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                if (this.isRelatedToCategory(tag.textContent, categoryType)) {
                    tag.style.boxShadow = '0 0 20px var(--glow-violet)';
                    tag.style.transform = 'scale(1.1)';
                }
            });
        });
        
        // Add glow effect to category
        category.style.boxShadow = '0 0 40px var(--glow-violet)';
        category.style.transform = 'scale(1.02)';
    }

    deactivateSkillCategory() {
        document.querySelectorAll('.tech-tag').forEach(tag => {
            tag.style.boxShadow = '';
            tag.style.transform = '';
        });
        
        document.querySelectorAll('.skill-category').forEach(category => {
            category.style.boxShadow = '';
            category.style.transform = '';
        });
    }

    isRelatedToCategory(tech, category) {
        const relationships = {
            'ai-ml': ['Python', 'TensorFlow', 'Keras', 'Deep Learning', 'Computer Vision', 'Machine Learning'],
            'programming': ['Python', 'TensorFlow', 'Keras', 'LangChain', 'OpenAI API'],
            'tools': ['pandas', 'scikit-learn', 'OpenCV', 'FFMPEG', 'Streamlit']
        };
        
        return relationships[category]?.includes(tech) || false;
    }

    activatePublicationCard(card) {
        // Add glow effect to publication
        card.style.boxShadow = '0 0 40px var(--glow-amber)';
        card.style.transform = 'scale(1.02)';
        
        // Animate tags
        const tags = card.querySelectorAll('.tag');
        tags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.transform = 'scale(1.1)';
                tag.style.boxShadow = '0 0 10px var(--glow-amber)';
            }, index * 100);
        });
    }

    deactivatePublicationCard() {
        document.querySelectorAll('.publication-card').forEach(card => {
            card.style.boxShadow = '';
            card.style.transform = '';
        });
        
        document.querySelectorAll('.tag').forEach(tag => {
            tag.style.transform = '';
            tag.style.boxShadow = '';
        });
    }

    activateHelloLetter(letter) {
        letter.style.transform = 'translateY(-30px) scale(1.3) rotateY(15deg)';
        letter.style.filter = 'drop-shadow(0 0 40px var(--glow-lime))';
        letter.style.zIndex = '100';
        letter.style.transition = 'all 0.3s ease';
    }

    deactivateHelloLetter(letter) {
        letter.style.transform = '';
        letter.style.filter = '';
        letter.style.zIndex = '';
        letter.style.transition = '';
    }

    activateDataStream() {
        const dataStream = document.getElementById('dataStream');
        const helloOverlay = dataStream.querySelector('.hello-overlay');
        const dataBits = dataStream.querySelectorAll('.data-bit');
        
        // Add extra glow effect
        dataStream.style.filter = 'drop-shadow(0 0 30px var(--glow-lime))';
        
        // Animate each bit with a stagger
        dataBits.forEach((bit, index) => {
            setTimeout(() => {
                bit.style.transform = 'scale(1.2) rotateY(10deg)';
                bit.style.color = 'var(--accent-cyan)';
                bit.style.textShadow = '0 0 25px var(--glow-cyan)';
            }, index * 50);
        });
        
        // Show HELLO overlay with animation
        setTimeout(() => {
            helloOverlay.style.opacity = '1';
            helloOverlay.style.transform = 'translate(-50%, -50%) scale(1.2)';
        }, 200);
    }

    deactivateDataStream() {
        const dataStream = document.getElementById('dataStream');
        const helloOverlay = dataStream.querySelector('.hello-overlay');
        const dataBits = dataStream.querySelectorAll('.data-bit');
        
        // Remove glow effect
        dataStream.style.filter = '';
        
        // Reset all bits
        dataBits.forEach(bit => {
            bit.style.transform = '';
            bit.style.color = '';
            bit.style.textShadow = '';
        });
        
        // Hide HELLO overlay
        helloOverlay.style.opacity = '0';
        helloOverlay.style.transform = 'translate(-50%, -50%) scale(1)';
    }

    displayRandomQuote() {
        const quoteText = document.getElementById('quoteText');
        const quoteAuthor = document.getElementById('quoteAuthor');
        
        if (quoteText && quoteAuthor) {
            // Get a random quote from the collection
            const randomIndex = Math.floor(Math.random() * this.aiQuotes.length);
            const randomQuote = this.aiQuotes[randomIndex];
            
            // Apply fade out effect
            quoteText.style.opacity = '0';
            quoteAuthor.style.opacity = '0';
            
            // Update content after fade out
            setTimeout(() => {
                quoteText.textContent = `"${randomQuote.text}"`;
                quoteAuthor.textContent = `- ${randomQuote.author}`;
                
                // Apply fade in effect
                quoteText.style.opacity = '1';
                quoteAuthor.style.opacity = '1';
            }, 300);
        }
    }

    startLoadingSequence() {
        // Animate progress bar
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressFill && progressText) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    // Hide loading screen after completion
                    setTimeout(() => {
                        const loadingScreen = document.getElementById('loadingScreen');
                        if (loadingScreen) {
                            loadingScreen.classList.add('fade-out');
                            setTimeout(() => {
                                loadingScreen.style.display = 'none';
                                this.isLoading = false;

                                // Navigate to home section
                                this.navigateToSection('about');
                            }, 500);
                        }
                    }, 500);
                }
                
                progressFill.style.width = `${progress}%`;
                progressText.textContent = `${Math.round(progress)}%`;
            }, 100);
        }
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach((counter, index) => {
            const target = counter.dataset.target;
            
            // Handle infinity symbol
            if (target === '∞') {
                counter.textContent = '∞';
                return;
            }
            
            const targetNum = parseFloat(target);
            const duration = 2000;
            const steps = 60;
            const increment = targetNum / steps;
            let current = 0;
            let step = 0;
            
            const animate = () => {
                step++;
                current += increment;
                
                // Format based on target type
                if (targetNum === Math.floor(targetNum)) {
                    counter.textContent = Math.floor(current);
                } else {
                    counter.textContent = current.toFixed(2);
                }
                
                if (step < steps) {
                    requestAnimationFrame(animate);
                } else {
                    if (targetNum === Math.floor(targetNum)) {
                        counter.textContent = targetNum;
                    } else {
                        counter.textContent = targetNum.toFixed(2);
                    }
                }
            };
            
            setTimeout(() => animate(), index * 200);
        });
    }

    handleFormSubmission() {
        const form = document.getElementById('contactForm');
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        
        // Show loading state
        btnText.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            btnText.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            // Reset form
            setTimeout(() => {
                form.reset();
                btnText.textContent = 'Send Message';
                submitBtn.style.background = 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))';
                submitBtn.disabled = false;
            }, 2000);
        }, 1500);
    }
}

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AICorePortfolio();
});

// Add smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', () => {
    // Parallax effect for background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.neural-background');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease-out';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.pipeline-node, .skill-category, .publication-card, .contact-item').forEach(el => {
        observer.observe(el);
    });

    // Add hover sound effects (optional)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    document.addEventListener('mouseover', (e) => {
        if (e.target.matches('.command-item, .pipeline-node, .skill-category, .publication-card')) {
            // Create subtle hover sound
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        const sections = ['home', 'about', 'projects', 'skills', 'publications', 'contact'];
        const currentIndex = sections.indexOf(document.querySelector('.content-section.active').id.replace('-section', ''));
        
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % sections.length;
                document.querySelector(`[data-section="${sections[nextIndex]}"]`).click();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
                document.querySelector(`[data-section="${sections[prevIndex]}"]`).click();
                break;
        }
    });

    // Add mouse trail effect
    let mouseTrail = [];
    const maxTrailLength = 20;

    document.addEventListener('mousemove', (e) => {
        mouseTrail.push({ x: e.clientX, y: e.clientY, timestamp: Date.now() });
        
        if (mouseTrail.length > maxTrailLength) {
            mouseTrail.shift();
        }
        
        // Remove old trail points
        mouseTrail = mouseTrail.filter(point => Date.now() - point.timestamp < 1000);
    });

    // Create floating particles
    const createParticles = () => {
        const particles = [];
        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
        
        return particles;
    };

    const particles = createParticles();
    const particleCanvas = document.createElement('canvas');
    const particleCtx = particleCanvas.getContext('2d');
    
    particleCanvas.style.position = 'fixed';
    particleCanvas.style.top = '0';
    particleCanvas.style.left = '0';
    particleCanvas.style.width = '100%';
    particleCanvas.style.height = '100%';
    particleCanvas.style.pointerEvents = 'none';
    particleCanvas.style.zIndex = '1';
    
    document.body.appendChild(particleCanvas);
    
    const animateParticles = () => {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
        
        particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
            if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
            
            particleCtx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
            particleCtx.beginPath();
            particleCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            particleCtx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    };
    
    animateParticles();
}); 
