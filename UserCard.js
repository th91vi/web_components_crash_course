const userCardTemplate = document.createElement('template');
userCardTemplate.innerHTML = `
    <style>
        h3 {
            color: coral;
        }
    </style>
    <div class="user-card">
        <img />
        <div>
            <h3></h3>
        </div>
    </div>
`;

class UserCard extends HTMLElement {
    constructor(){
        super();

        // this.innerHTML = `<style>h3 { color: coral }</style> <h3>${this.getAttribute('name')}</h3>`;
        
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(userCardTemplate.content.cloneNode(true));
        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
    }
}

window.customElements.define('user-card', UserCard);