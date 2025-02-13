function filterCategory(category) {
    let courses = document.querySelectorAll('.course-card');
    courses.forEach(course => {
    if (category === 'Todos' || course.getAttribute('data-category') === category) {
        course.style.display = 'block';
    } else {
        course.style.display = 'none';
    }
    });
}
window.addEventListener('DOMContentLoaded', function() {
    const selectedCategory = localStorage.getItem('selectedCategory');
    if (selectedCategory) {
      filterCategory(selectedCategory);
      localStorage.removeItem('selectedCategory');
    }
  });
  