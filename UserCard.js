const userCardTemplate = document.createElement('template');
userCardTemplate.innerHTML = `
    <style>
        .user-card {
            background: #f4f4f4;
            width: 500px;
            display: grid;
            grid-template-columns: 1fr 2fr;
            grid-gap: 10px;
            margin-bottom: 15px;
            border-bottom: darkorchid 5px solid;
        }

        .user-card img {
            width: 100%;
        }

        .user-card button {
            cursor: pointer;
            background: darkorchid;
            color: #fff;
            border: 0;
            border-radius: 5px;
            padding: 5px 10px;
        }
    </style>
    <div class="user-card">
        <img />
        <div>
            <h3></h3>
            <div class="info">
                <p> <slot name="name" /> </p>
                <p> <slot name="phone" /> </p>
            </div>
            <button class="util_toggle-info">Hide Info</button>
        </div>
    </div>
`;

class UserCard extends HTMLElement {
    constructor(){
        super();

        this.showInfo = true;

        // this.innerHTML = `<style>h3 { color: coral }</style> <h3>${this.getAttribute('name')}</h3>`;
        
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(userCardTemplate.content.cloneNode(true));
        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
    }

    toggleInfo(){
        this.showInfo = !this.showInfo;
        
        const info = this.shadowRoot.querySelector('.info');
        const toggleBtn = this.shadowRoot.querySelector('.util_toggle-info');
        
        if (this.showInfo) {
            info.style.display = 'block';
            toggleBtn.innerText = 'Hide Info';
        } else {
            info.style.display = 'none';
            toggleBtn.innerText = 'Show Info';
        }
    }

    connectedCallback() {
        this.shadowRoot.querySelectorAll('.util_toggle-info').forEach(toggle => {
            toggle.addEventListener('click', () => this.toggleInfo())
        })
    }

    disconnectedCallback(){
        this.shadowRoot.querySelectorAll('.util_toggle-info').forEach(toggle => {
            toggle.removeEventListener();
        })
    }
}

window.customElements.define('user-card', UserCard);