const lists = document.querySelector('.display');
const search = document.querySelector('.search input')
search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});
const filterTodos = (term) => {
    Array.from(lists.children)
        .filter((data) => {
            return !data.textContent.toLowerCase().includes(term)
        })
        .forEach((term) => { term.classList.add('filtered') });
    Array.from(lists.children)
        .filter((data) => {
            return data.textContent.toLowerCase().includes(term)
        })
        .forEach((term) => { term.classList.remove('filtered') });
}
