class CardApp {
    constructor() {
        this.cardList = $(".card-list");
        this.word = $("#word");
        this.addEvent();
        this.data = [];
        $.ajax({
            url: "/data.php",
            method: "get",
            success: (data) => {
                this.data = data;
                this.loadData(data, null);
            }
        });
    }

    loadData(data, word) {
        this.cardList.empty();
        data.forEach((item, idx) => {
            let str = this.makeCard(item);
            let reg = null;
            if(word != null){
                reg = new RegExp(word, "gi");
                let content = str.querySelector(".name").innerHTML;
                content = content.replace(reg, `<span class="hl">$&</span>`);
                str.querySelector(".name").innerHTML = content;
            }
            this.cardList.append(str);
            setTimeout(() => {
                $(".card-list > .card").eq(idx).addClass("active");
            }, 50 + idx * 300)
        })
    }

    addEvent(){
        $("#btnSearch").on("click", this.search);
    }

    search = () => {
        let word = this.word.val();
        let filterData = this.data.filter(item=>item.name.includes(word));
        this.loadData(filterData, word);
    }

    makeCard(item) {
        return `<div class="card">
        <div class="img">
            <img src="/travel/${item.image}" alt="${item.name}">
        </div>
        <div class="info">
            <h4 class="name">${item.name}</h4>
            <h4 class="price">${item.price}</h4>
            <div class="grade">
                <span class="result">${item.result}명</span>
            </div>
        </div>
    </div>`
    }
}