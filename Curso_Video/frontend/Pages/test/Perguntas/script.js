document.addEventListener("DOMContentLoaded", function() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        item.addEventListener("click", function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector(".faq-toggle");

            if (answer.classList.contains("show")) {
                answer.classList.remove("show");
                icon.classList.remove("rotate");
            } else {
                document.querySelectorAll(".faq-answer").forEach((el) => el.classList.remove("show"));
                document.querySelectorAll(".faq-toggle").forEach((el) => el.classList.remove("rotate"));

                answer.classList.add("show");
                icon.classList.add("rotate");
            }
        });
    });
});
