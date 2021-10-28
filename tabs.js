const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

let tabFocus = 0;

tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
})

function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;
    
    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);
    }
    
    if (e.keyCode === keydownRight) {
        tabFocus++;
        if (tabFocus >= tabs.length) {
            tabFocus = 0;
        }
    }
    
    if (e.keyCode === keydownLeft) {
        tabFocus--;
        if (tabFocus < 0) {
            tabFocus = tabs.length - 1;
        }
    }
    
    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
}

function changeTabPanel(e) {
    console.log(e);
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute('aria-controls');

    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;
    const targetImage = targetTab.getAttribute('data-image');
    // console.log(mainContainer)   
    tabContainer
           .querySelector('[aria-selected]')
           .setAttribute('aria-selected', false);
    
    tabContainer.setAttribute('aria-selected', true);
    
    hideContent(mainContainer, '[role="tabpanel"]');

    showContent(mainContainer, [`#${targetPanel}`]);
    
    hideContent(mainContainer, 'picture');

    showContent(mainContainer, [`#${targetImage}`]);
    
}

function hideContent(parent, content) {
    parent
        .querySelectorAll(content)
        .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
    parent.querySelector(content).removeAttribute('hidden');
}