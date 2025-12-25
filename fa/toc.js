// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="intro.html"><strong aria-hidden="true">1.</strong> مقدمه</a></li><li class="chapter-item expanded "><a href="overview.html"><strong aria-hidden="true">2.</strong> نمای کلی</a></li><li class="chapter-item expanded "><a href="design/index.html"><strong aria-hidden="true">3.</strong> طراحی</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="design/institution-packet/index.html"><strong aria-hidden="true">3.1.</strong> بسته موسسه</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="design/institution-packet/availabilities.html"><strong aria-hidden="true">3.1.1.</strong> دسترسی‌ها</a></li><li class="chapter-item expanded "><a href="design/institution-packet/facilities.html"><strong aria-hidden="true">3.1.2.</strong> امکانات</a></li><li class="chapter-item expanded "><a href="design/institution-packet/learners.html"><strong aria-hidden="true">3.1.3.</strong> فراگیران</a></li><li class="chapter-item expanded "><a href="design/institution-packet/instructors.html"><strong aria-hidden="true">3.1.4.</strong> مدرسان</a></li><li class="chapter-item expanded "><a href="design/institution-packet/supervisors.html"><strong aria-hidden="true">3.1.5.</strong> ناظران</a></li><li class="chapter-item expanded "><a href="design/institution-packet/resources.html"><strong aria-hidden="true">3.1.6.</strong> منابع</a></li><li class="chapter-item expanded "><a href="design/institution-packet/subjects.html"><strong aria-hidden="true">3.1.7.</strong> موضوعات</a></li><li class="chapter-item expanded "><a href="design/institution-packet/courses.html"><strong aria-hidden="true">3.1.8.</strong> درووس</a></li><li class="chapter-item expanded "><a href="design/institution-packet/units.html"><strong aria-hidden="true">3.1.9.</strong> واحدها</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.2.</strong> ویژگی‌ها</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="design/features/data-anonymization-for-solvers.html"><strong aria-hidden="true">3.2.1.</strong> ناشناس‌سازی داده برای Solverها</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="architecture/index.html"><strong aria-hidden="true">4.</strong> معماری</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="architecture/adr/index.html"><strong aria-hidden="true">4.1.</strong> سوابق تصمیم‌گیری معماری</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="architecture/adr/000001-rust-as-primary-microservices-language.html"><strong aria-hidden="true">4.1.1.</strong> انتخاب راست (Rust) به عنوان زبان اصلی</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="development/index.html"><strong aria-hidden="true">5.</strong> توسعه</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="development/backend/index.html"><strong aria-hidden="true">5.1.</strong> بکند</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="development/backend/auth-service/index.html"><strong aria-hidden="true">5.1.1.</strong> سرویس احراز هویت</a></li><li class="chapter-item expanded "><a href="development/backend/scheduler-service/index.html"><strong aria-hidden="true">5.1.2.</strong> سرویس زمان‌بندی</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="development/backend/scheduler-service/basiic-scheduler/index.html"><strong aria-hidden="true">5.1.2.1.</strong> زمان‌بند پایه</a></li><li class="chapter-item expanded "><a href="development/backend/scheduler-service/manual-scheduler/index.html"><strong aria-hidden="true">5.1.2.2.</strong> زمان‌بند دستی</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="development/frontend/index.html"><strong aria-hidden="true">5.2.</strong> فرانت‌اند</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="development/frontend/admin/index.html"><strong aria-hidden="true">5.2.1.</strong> ادمین</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="development/frontend/admin/admin panel.html"><strong aria-hidden="true">5.2.1.1.</strong> پنل ادمین</a></li></ol></li><li class="chapter-item expanded "><a href="development/frontend/user/index.html"><strong aria-hidden="true">5.2.2.</strong> کاربر</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="development/frontend/user/people panel.html"><strong aria-hidden="true">5.2.2.1.</strong> پنل افراد</a></li><li class="chapter-item expanded "><a href="development/frontend/user/organization panel.html"><strong aria-hidden="true">5.2.2.2.</strong> پنل سازمان</a></li></ol></li></ol></li></ol></li><li class="chapter-item expanded "><a href="deployment/index.html"><strong aria-hidden="true">6.</strong> استقرار</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="deployment/infrastructure/index.html"><strong aria-hidden="true">6.1.</strong> زیرساخت</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="deployment/environments/index.html"><strong aria-hidden="true">6.1.1.</strong> محیط‌ها</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="appendix/index.html"><strong aria-hidden="true">7.</strong> پیوست</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="appendix/contributing.html"><strong aria-hidden="true">7.1.</strong> مشارکت</a></li><li class="chapter-item expanded "><a href="appendix/glossary.html"><strong aria-hidden="true">7.2.</strong> واژه‌نامه</a></li></ol></li><li class="chapter-item expanded "><a href="license.html"><strong aria-hidden="true">8.</strong> مجوز</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
