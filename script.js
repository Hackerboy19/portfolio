// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ===== POSTS DATA =====
const DEFAULT_POSTS = [
  {
    id: 1,
    author: 'Sarah Chen',
    title: 'UI/UX Designer',
    avatar: 'https://i.pravatar.cc/150?img=1',
    time: '2 hours ago',
    text: 'Just launched our new design system! Excited to see how it simplifies our workflow. #Design #WebDesign',
    image: null,
    likes: 234,
    comments: 45,
    shares: 12,
    liked: false,
    tags: ['#Design', '#WebDesign']
  },
  {
    id: 2,
    author: 'James Wilson',
    title: 'Product Manager',
    avatar: 'https://i.pravatar.cc/150?img=2',
    time: '4 hours ago',
    text: 'Lessons learned from scaling our tech team to 50+ engineers. The most important? Communication, communication, communication. #Leadership #Tech',
    image: null,
    likes: 567,
    comments: 89,
    shares: 123,
    liked: false,
    tags: ['#Leadership', '#Tech']
  },
  {
    id: 3,
    author: 'Alex Rodriguez',
    title: 'Full Stack Developer',
    avatar: 'https://i.pravatar.cc/150?img=3',
    time: '6 hours ago',
    text: 'Web development in 2026 is wild. Just built a real-time collaborative editor with React, WebSockets, and AI-powered suggestions. #WebDevelopment #ReactJS',
    image: null,
    likes: 892,
    comments: 156,
    shares: 234,
    liked: false,
    tags: ['#WebDevelopment', '#ReactJS']
  },
  {
    id: 4,
    author: 'Hackerboy19',
    title: 'Full Stack Developer',
    avatar: 'https://i.pravatar.cc/150?img=12',
    time: '1 hour ago',
    text: 'Just deployed my latest portfolio website! Built with vanilla JavaScript, modern CSS, and optimized for all devices. Check it out and let me know what you think! #Portfolio #WebDevelopment',
    image: null,
    likes: 125,
    comments: 34,
    shares: 18,
    liked: false,
    tags: ['#Portfolio', '#WebDevelopment']
  }
];

// ===== POST MANAGER =====
class PostManager {
  constructor() {
    this.posts = this.loadPosts();
    this.init();
  }

  loadPosts() {
    const stored = localStorage.getItem('portfolioPosts');
    return stored ? JSON.parse(stored) : DEFAULT_POSTS;
  }

  savePosts() {
    localStorage.setItem('portfolioPosts', JSON.stringify(this.posts));
  }

  addPost(text) {
    const newPost = {
      id: Math.max(...this.posts.map(p => p.id), 0) + 1,
      author: 'Hackerboy19',
      title: 'Full Stack Developer',
      avatar: 'https://i.pravatar.cc/150?img=12',
      time: 'Just now',
      text: text,
      image: null,
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
      tags: []
    };
    this.posts.unshift(newPost);
    this.savePosts();
    this.render();
  }

  toggleLike(postId) {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
      this.savePosts();
      this.render();
    }
  }

  render() {
    const container = document.getElementById('feedContainer');
    container.innerHTML = this.posts.map(post => `
      <div class="post" data-id="${post.id}">
        <div class="post-header">
          <div class="post-author">
            <img src="${post.avatar}" alt="${post.author}" class="post-avatar">
            <div>
              <h4>${post.author}</h4>
              <p class="post-title">${post.title}</p>
              <p class="post-time">${post.time}</p>
            </div>
          </div>
          <div class="post-menu">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>

        <div class="post-content">
          <p class="post-text">${post.text}</p>
          ${post.tags.length > 0 ? `
            <div class="post-tags">
              ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
            </div>
          ` : ''}
          ${post.image ? `<img src="${post.image}" alt="Post image" class="post-media">` : ''}
        </div>

        <div class="post-stats">
          <span>${post.likes} likes</span>
          <span>${post.comments} comments • ${post.shares} shares</span>
        </div>

        <div class="post-actions">
          <button class="post-action-btn ${post.liked ? 'liked' : ''}" onclick="postManager.toggleLike(${post.id})">
            <i class="fas fa-thumbs-up"></i> Like
          </button>
          <button class="post-action-btn">
            <i class="fas fa-comment"></i> Comment
          </button>
          <button class="post-action-btn">
            <i class="fas fa-share"></i> Share
          </button>
          <button class="post-action-btn">
            <i class="fas fa-bookmark"></i> Save
          </button>
        </div>

        <div class="comments-section">
          <div class="comment">
            <img src="https://i.pravatar.cc/32?img=5" alt="" class="comment-avatar">
            <div class="comment-body">
              <div class="comment-author">Sarah Chen</div>
              <div class="comment-text">Great work! Love the design. 👍</div>
            </div>
          </div>
          <div class="comment">
            <img src="https://i.pravatar.cc/32?img=6" alt="" class="comment-avatar">
            <div class="comment-body">
              <div class="comment-author">James Wilson</div>
              <div class="comment-text">Impressive! This is exactly what we need.</div>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  init() {
    this.render();
  }
}

const postManager = new PostManager();

// ===== MODAL MANAGEMENT =====
const postInput = document.getElementById('postInput');
const postBtn = document.getElementById('postBtn');
const postModal = document.getElementById('postModal');
const closeModal = document.getElementById('closeModal');
const cancelModal = document.getElementById('cancelModal');
const submitPost = document.getElementById('submitPost');
const modalPostText = document.getElementById('modalPostText');

postInput.addEventListener('click', () => {
  postModal.classList.add('active');
  modalPostText.focus();
});

postBtn.addEventListener('click', () => {
  postModal.classList.add('active');
  modalPostText.focus();
});

closeModal.addEventListener('click', () => {
  postModal.classList.remove('active');
  modalPostText.value = '';
});

cancelModal.addEventListener('click', () => {
  postModal.classList.remove('active');
  modalPostText.value = '';
});

submitPost.addEventListener('click', () => {
  const text = modalPostText.value.trim();
  if (text) {
    postManager.addPost(text);
    postModal.classList.remove('active');
    modalPostText.value = '';
  }
});

postModal.addEventListener('click', (e) => {
  if (e.target === postModal) {
    postModal.classList.remove('active');
    modalPostText.value = '';
  }
});

// ===== NAV ACTIVE STATE =====
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// ===== INITIAL LOAD =====
window.addEventListener('load', () => {
  console.log('Portfolio Feed loaded successfully!');
});
