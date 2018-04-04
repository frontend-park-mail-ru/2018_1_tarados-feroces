import BaseComponent from '../BaseComponent/BaseComponent'


export default class FriendAction extends BaseComponent {

    render(context) {
        this.template = `<div class="friends-modal-points">
                            <p class="friends-modal-points-text">{{text}}</p>
                        </div>`;
        super.render(context);
    }
}

