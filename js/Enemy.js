


//敌机(构造函数)
function Enemy(type){
	
	//随机id
	this.id = parseInt(Math.random() * 100000) + "";
	
	//属性: ele
	this.ele = document.createElement("div");
	this.hp = 1; //血量
	this.speed = 0; //速度
	this.dieImgs = []; //敌机销毁时的图片
	
	//初始化方法
	this.init = function(){
		document.body.appendChild(this.ele); //添加到body上
		//将该敌机添加到enemyList中
		gameEngine.enemyList[this.id] = this;
		
		//根据敌机类型,确定css样式,hp,speed,dieImgs
		switch(type) {
			//小型敌机
			case this.PLANE_TYPE_SMALL: 
				this.ele.className = "enemy-small"; //css样式
				this.hp = this.PLANE_HP_SMALL; //血量
				this.speed = this.PLANE_SPEED_SMALL; //速度
				this.dieImgs = ["images/plane1_die1.png", "images/plane1_die2.png", "images/plane1_die3.png"]; //飞机销毁时的动画图片
				break;
			
			//中型敌机
			case this.PLANE_TYPE_MIDDLE: 
				this.ele.className = "enemy-middle"; //css样式
				this.hp = this.PLANE_HP_MIDDLE; //血量
				this.speed = this.PLANE_SPEED_MIDDLE; //速度
				this.dieImgs = ["images/plane2_die1.png", "images/plane2_die2.png", "images/plane2_die3.png", "images/plane2_die4.png"]; //飞机销毁时的动画图片
				break;
			
			//大型敌机
			case this.PLANE_TYPE_LARGE: 
				this.ele.className = "enemy-large"; //css样式
				this.hp = this.PLANE_HP_LARGE; //血量
				this.speed = this.PLANE_SPEED_LARGE; //速度
				this.dieImgs = ["images/plane3_die1.png", "images/plane3_die2.png", "images/plane3_die3.png", "images/plane3_die4.png", "images/plane3_die5.png", "images/plane3_die6.png"]; //飞机销毁时的动画图片
				break;
		}
		
		//随机位置
		var left = gameEngine.ele.offsetLeft + Math.random()*(gameEngine.ele.offsetWidth - this.ele.offsetWidth)
		this.ele.style.left = left + "px";
		this.ele.style.top = -this.ele.offsetHeight + "px";
		
		return this;
	}
	
	//敌机移动
	this.move = function(){
		var self = this; 
		this.timer = setInterval(function(){
			
			//如果超出了浏览器(游戏区域), 则将该敌机移除
			if (self.ele.offsetTop > document.documentElement.clientHeight) {
				clearInterval(self.timer); //关闭定时器, 停止移动
				self.destroy(); //移除敌机
				
				//将enemyList中对应的敌机删除
				delete gameEngine.enemyList[self.id];
			}
			
			//移动
			self.ele.style.top = self.ele.offsetTop + self.speed + "px";
		}, 50);
	}
	
	//被攻击
	this.hurt = function(){
		this.hp--; //血量-1
		if (this.hp == 0) {  //这里的等于0
			//血量没了,现在可以爆炸了
			this.boom();
		}
	}
	
	//敌机爆炸
	this.boom = function(){
		clearInterval(this.timer); //停止移动

		//爆炸动画
		var index = 0;
		var self = this;
		var dieTimer = setInterval(function(){
			if (index >= self.dieImgs.length) {
				clearInterval(dieTimer); //停止定时器
				self.destroy(); //销毁敌机
				//将enemyList中的敌机删除
				//delete gameEngine.enemyList[self.id];

			}
			else {
				//切换图片
				self.ele.style.background = "url(" + self.dieImgs[index] + ")";
				index++;
			}
		}, 50);
	}
	
	//敌机销毁
	this.destroy = function(){
		document.body.removeChild(this.ele);
	}
	
}


Enemy.prototype = {
	//敌机的类型
	PLANE_TYPE_SMALL: 1, //小型敌机
	PLANE_TYPE_MIDDLE: 2, //中型敌机
	PLANE_TYPE_LARGE: 3, //大型敌机
	
	//血量
	PLANE_HP_SMALL: 1, //小型敌机的HP(血量)
	PLANE_HP_MIDDLE: 3, //中型敌机的HP
	PLANE_HP_LARGE: 8, //大型敌机的HP
	
	//速度
	PLANE_SPEED_SMALL: 8, //小型敌机的速度
	PLANE_SPEED_MIDDLE: 5, //小型敌机的速度
	PLANE_SPEED_LARGE: 3, //小型敌机的速度
}











