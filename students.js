// Student data
const students = [
    {
        id: 1,
        name: "Rajan",
        rollNo: "DMCE/COMP/C/001",
        profileImage: "https://via.placeholder.com/200x200/4f46e5/ffffff?text=R",
        interests: ["Web Development", "AI/ML", "Competitive Programming"],
        skills: ["JavaScript", "Python", "React", "Node.js"],
        color: "#4f46e5",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
        id: 2,
        name: "Krushna",
        rollNo: "DMCE/COMP/C/002",
        profileImage: "https://via.placeholder.com/200x200/e74c3c/ffffff?text=K",
        interests: ["Mobile Development", "UI/UX Design", "Database Management"],
        skills: ["Flutter", "Java", "MySQL", "Figma"],
        color: "#e74c3c",
        gradient: "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)"
    }
];

// DOM elements
const studentsContainer = document.getElementById('students-container');
const searchInput = document.getElementById('student-search');

// Render students
function renderStudents(studentsToRender = students) {
    studentsContainer.innerHTML = '';
    
    studentsToRender.forEach(student => {
        const studentCard = document.createElement('div');
        studentCard.className = 'student-card';
        studentCard.style.background = student.gradient;
        
        studentCard.innerHTML = `
            <div class="student-card-inner">
                <div class="student-avatar">
                    <img src="${student.profileImage}" alt="${student.name}">
                    <div class="student-status"></div>
                </div>
                <div class="student-info">
                    <h3 class="student-name">${student.name}</h3>
                    <p class="student-roll">${student.rollNo}</p>
                    <div class="student-interests">
                        ${student.interests.map(interest => 
                            `<span class="interest-tag">${interest}</span>`
                        ).join('')}
                    </div>
                    <div class="student-skills">
                        ${student.skills.map(skill => 
                            `<span class="skill-tag">${skill}</span>`
                        ).join('')}
                    </div>
                </div>
                <div class="student-actions">
                    <button class="btn-profile" onclick="viewProfile('${student.name.toLowerCase()}')">
                        <i class="fas fa-user"></i> View Profile
                    </button>
                    <div class="social-links">
                        <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-github"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        `;
        
        studentsContainer.appendChild(studentCard);
    });
}

// Search functionality
function searchStudents() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(searchTerm) ||
        student.rollNo.toLowerCase().includes(searchTerm) ||
        student.interests.some(interest => interest.toLowerCase().includes(searchTerm)) ||
        student.skills.some(skill => skill.toLowerCase().includes(searchTerm))
    );
    renderStudents(filteredStudents);
}

// View profile function
function viewProfile(studentName) {
    window.location.href = `profiles/${studentName}.html`;
}

// Add floating animation to cards
function addFloatingAnimation() {
    const cards = document.querySelectorAll('.student-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderStudents();
    setTimeout(addFloatingAnimation, 100);
    
    // Search event listeners
    searchInput.addEventListener('input', searchStudents);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchStudents();
        }
    });
});

// Add particle background effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles
setTimeout(createParticles, 1000);
