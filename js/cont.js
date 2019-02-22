$(function(){
	var basePath = "http://192.168.1.9:8081/hwyRestful/"
		//设置按钮事件
	$(".setBtn").click(function(){
		$("#alertBox").show();
		$(".setBox").show();
	});

	//设置按钮事件
	$(".resetBtn").click(function(){
		$("#spanBox1").empty();
		$("#spanBox2").empty();
		$("#spanBox3").empty();
		// 清除已经选中的用户
		$.ajax({
				url:basePath+"resetSelectEmployee",
				type:"get",
				dataType:"json",
				success:function(data){
					console.log("已清除选中的用户");
				},
				error:function(){
				}
			});
	});

	//设置人数开始按钮事件
	$(".staBtn").click(function(){
		// 将人员内容清空，然后再进行查询
		$("#spanBox1").empty();
		$("#spanBox2").empty();
		$("#spanBox3").empty();
		console.log("765431");
		console.log(basePath+"employeeShow");
		// 查询
		$.ajax({
				url:basePath+"employeeShow",
				type:"get",
				dataType:"json",
				success:function(data){
					// data:{employeeName: "[[{\"expertName\":\"赵一\"}],[{\"financeName\":\"王一\"}],[{\"technologyName\":\"李一\"}]]"}
console.log(data.employeeName);
					var parsedJson = jQuery.parseJSON(data.employeeName); 
					// 解析值
					for(var i=0;i<parsedJson.length;i++){
						var content = parsedJson[i];
						for (var j = 0; j < content.length; j++) {
							if (i == 0) {
								// 监督专家
								var expertName = content[j].expertName
								$("#spanBox1").append("<span class=\"pic pic1\">" + expertName + "</span>");
							} else if (i == 1) {
								// 财务
								var financeName = content[j].financeName
								$("#spanBox2").append("<span class=\"pic pic1\">" + financeName + "</span>");
							} else if (i == 2) {
								// 技术
								var technologyName = content[j].technologyName
								$("#spanBox3").append("<span class=\"pic pic1\">" + technologyName + "</span>");
							}
						}
					}
				},
				error:function(){
				}
			});
	});

	//弹框按钮事件
	$(".saveBtn").click(function(){
		$("#alertBox").show();
        $(".setBox").hide();
        $(".sureBox").show();
     });
        //確定按鈕
        $(".sureBtn").click(function(){
			var expertNum=$(".expertNum").val();
			var financeNum=$(".financeNum").val();
			var technologyNum=$(".technologyNum").val();
			$.ajax({
			url : basePath+"/employeeConfig",
			type : 'post' ,
			dataType : "json",
			data: {
				_method:'PUT',
				acceptContent :
						JSON.stringify(
							{
								id : 1,
								expert : expertNum,
								finance : financeNum,
								technology :technologyNum
							}
						)
			},
			xhrFields: {withCredentials: true},
            crossDomain: true
		})
		.done(function(data){
			console.log(data.result);
		})
		.fail(function(){
			console.log('请求数据失败！');
		});

		$("#alertBox").hide();
		$(".setBox").hide();
		$(".sureBox").hide();
        });
	
	
	
	//退出按鈕
	$("#contentOut").live("click", function(){
		console.log(2222);
		// 清除已经选中的用户
		$.ajax({
				url:basePath+"resetSelectEmployee",
				type:"get",
				dataType:"json",
				success:function(data){
					console.log("已清除选中的用户");
				},
				error:function(){
				}
			});
		window.location.href="http://192.168.1.9:8082/qy/index.html";
	});

	//取消按鈕
	$(".cancelBtn").click(function(){
		$("#alertBox").hide();
        $(".setBox").hide();
        $(".sureBox").hide();
	});

	  
});