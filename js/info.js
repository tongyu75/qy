$(function(){
	var basePath = "http://192.168.1.7:8081/hwyRestful/"
	// 查询人员列表
	$.ajax({
		url:basePath+"employee",
			type:"get",
				data:{},
				dataType:"json",
				success:function(data){
					// 解析值
					for(var i=0;i<data.data.length;i++){
						var content = data.data[i];
						// id
						var id = content.id;
						// 姓名
						var name = content.name;
						// 专业
						var major = content.major;
						// 区分
						var type = content.type;
						var typeName = "";
						if (type == 1) {
							typeName ="监督专家"
						} else if (type == 2) {
							typeName ="财务类"
						} else if (type == 3) {
							typeName ="技术类"
						}
						// 用户状态(在家，不在家)
						var status = content.status;
						if (status == '1') {
							// tr显示用户,此用户在家,会出现对号
							$("tbody").append("<tr><td>" + name + "</td><td>" + major +"</td><td>" + typeName + "</td><td><span style=\"font-weight: bold\">√   </span><button style=\"margin-right:20px\" id=\"adEmployeeBtn\">新增</button><button style=\"margin-right:20px\" id=\"modifyEmployeeBtn\">修改</button><button id=\"delEmployeeBtn\">删除</button></td><td style=\"display: none;\" id=\"employeeId\">" + id + "</td><td style=\"display: none;\" id=\"status\">" + status + "</td></tr>");
						} else {
							// tr显示用户,此用户不在家，不会出现对号
							$("tbody").append("<tr><td>" + name + "</td><td>" + major +"</td><td>" + typeName + "</td><td>&nbsp;&nbsp;&nbsp;<button style=\"margin-right:20px\" id=\"adEmployeeBtn\">新增</button><button style=\"margin-right:20px\" id=\"modifyEmployeeBtn\">修改</button><button id=\"delEmployeeBtn\">删除</button></td><td style=\"display: none;\" id=\"employeeId\">" + id + "</td><td style=\"display: none;\" id=\"status\">" + status + "</td></tr>");
						}
						
					}
				},
				error:function(){
				}
	});
	// 添加人员设置按钮事件
	$("#adEmployeeBtn").live("click", function(){
		// 将人员内容清空，然后再进行查询
		$("#adEmployeeName").val("");
		$("#adEmployeeMajor").val("");
		$("#adEmployeeType").val(0);
		// 显示弹出框
		$("#alertBox").show();
		$(".setBox").show();
	});

	//新增按鈕
    $(".saveEmployeeBtn").click(function(){
			var adEmployeeName=$("#adEmployeeName").val();
			var adEmployeeMajor=$("#adEmployeeMajor").val();
			var adEmployeeType=$("#adEmployeeType").val();
			var typeName = "";
			if (adEmployeeType == 1) {
				typeName ="监督专家"
			} else if (adEmployeeType == 2) {
				typeName ="财务类"
			} else if (adEmployeeType == 3) {
				typeName ="技术类"
			}
			var adEmployeeStatus=$('input:radio[name="adEmployeeStatus"]:checked').val();
			$.ajax({
			url : basePath+"employee",
			type : 'post' ,
			dataType : "json",
			data: {
				acceptContent :
						JSON.stringify(
							{
								name : adEmployeeName,
								major : adEmployeeMajor,
								type :adEmployeeType,
								status :adEmployeeStatus
							}
						)
			},
			xhrFields: {withCredentials: true},
            crossDomain: true
			})
			.done(function(data){
				if (adEmployeeStatus == '1') {
				// tr显示用户,此用户在家,会出现对号
				$("tbody").append("<tr><td>" + adEmployeeName + "</td><td>" + adEmployeeMajor + "</td><td>" + typeName + "</td><td><span style=\"font-weight: bold\">√   </span><button style=\"margin-right:20px\" id=\"adEmployeeBtn\">新增</button><button style=\"margin-right:20px\" id=\"modifyEmployeeBtn\">修改</button><button id=\"delEmployeeBtn\">删除</button></td><td style=\"display: none;\" id=\"employeeId\">" + data.id + "</td></tr>");
				} else {
				// tr显示用户,此用户不在家,不会出现对号
				$("tbody").append("<tr><td>" + adEmployeeName + "</td><td>" + adEmployeeMajor + "</td><td>" + typeName + "</td><td>&nbsp;&nbsp;&nbsp;<button style=\"margin-right:20px\" id=\"adEmployeeBtn\">新增</button><button style=\"margin-right:20px\" id=\"modifyEmployeeBtn\">修改</button><button id=\"delEmployeeBtn\">删除</button></td><td style=\"display: none;\" id=\"employeeId\">" + data.id + "</td></tr>");
				}
			
			})
			.fail(function(){
				console.log('请求数据失败！');
			});
			$("#alertBox").hide();
			$(".setBox").hide();
     });	

	// 修改人员设置按钮事件
	$("#modifyEmployeeBtn").live("click", function(){
		// 显示弹出框
		$("#alertModifyBox").show();
		$(".setModifyBox").show();

		// 姓名
		var name = $(this).parent().parent().children('td').eq(0).text();
		// 专业
		var major = $(this).parent().parent().children('td').eq(1).text();
		// 区分
		var type = $(this).parent().parent().children('td').eq(2).text();
		// ID
		var id = $(this).parent().parent().children('td').eq(4).text();
		// 用户状态
		var status = $(this).parent().parent().children('td').eq(5).text();
		// 设置初始值
		$("#modifyEmployeeName").val(name);
		$("#modifyEmployeeMajor").val(major);
		$("#modifyEmployeeId").val(id);
		$("#modifyEmployeeType option").each(function(){
			if ($(this).text() == type) {
				$(this).attr("selected",true);
			}
		});
		$(":radio[name='modifyEmployeeStatus'][value='" + status + "']").prop("checked", "checked");
	});

		//修改按鈕
        $(".modifyEmployeeBtn").live("click", function(){
			var modifyEmployeeName = $("#modifyEmployeeName").val();
			var modifyEmployeeMajor = $("#modifyEmployeeMajor").val();
			var modifyEmployeeTypeText = $("#modifyEmployeeType").find("option:selected").text(); 
			var modifyEmployeeType = $("#modifyEmployeeType").val(); 	
			var modifyEmployeeStatus=$('input:radio[name="modifyEmployeeStatus"]:checked').val();
			var id = $("#modifyEmployeeId").val();
			$.ajax({
			url : basePath+"employee",
			type : 'post' ,
			dataType : "json",
			data: {
				_method:'PUT',
				acceptContent :
						JSON.stringify(
							{
								id : id,
								name : modifyEmployeeName,
								major :modifyEmployeeMajor,
								type :modifyEmployeeType,
								status :modifyEmployeeStatus
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

			var trList = $("#dataList").children("tr")
			for (var i=0;i<trList.length;i++) {
				var tdArr = trList.eq(i).find("td");
				var modifyId = tdArr.eq(4).text()
				if (id == modifyId) {
					tdArr.eq(0).html(modifyEmployeeName);
					tdArr.eq(1).html(modifyEmployeeMajor);
					tdArr.eq(2).html(modifyEmployeeTypeText);
					if (modifyEmployeeStatus == '1') {
						// 此用户在家,会出现对号
						tdArr.eq(3).html("<span style=\"font-weight: bold\">√   </span><button style=\"margin-right:20px\" id=\"adEmployeeBtn\">新增</button><button style=\"margin-right:20px\" id=\"modifyEmployeeBtn\">修改</button><button id=\"delEmployeeBtn\">删除</button>");
					} else {
						// 此用户不在家,不会出现对号
						tdArr.eq(3).html("&nbsp;&nbsp;&nbsp;<button style=\"margin-right:20px\" id=\"adEmployeeBtn\">新增</button><button style=\"margin-right:20px\" id=\"modifyEmployeeBtn\">修改</button><button id=\"delEmployeeBtn\">删除</button>");
					}
					// $(":radio[name='modifyEmployeeStatus'][value='" + status + "']").prop("checked", "checked");
					tdArr.eq(5).html(modifyEmployeeStatus);
				}
			}
				
			$("#alertModifyBox").hide();
			$(".setModifyBox").hide();
			$(".sureBox").hide();
			});

		//删除按鈕
        $("#delEmployeeBtn").live("click", function(){
			// 删除ID
			var id = $(this).parent().next().text();
			// 父属性
			var parentAttr = $(this).parent().parent();
			$.ajax({
			url : basePath+"employee",
			type : 'post' ,
			dataType : "json",
			data: {
				_method:'DELETE',
				acceptContent :
						JSON.stringify(
							{
								id : id
							}
						)
			},
			xhrFields: {withCredentials: true},
            crossDomain: true
			})
			.done(function(data){
				parentAttr.remove();
			})
			.fail(function(){
				console.log('请求数据失败！');
			});

			$("#alertBox").hide();
			$(".setBox").hide();
			$(".sureBox").hide();
        });

			//取消按鈕
		$(".cancelEmployeeBtn").click(function(){
			$("#alertBox").hide();
			$(".setBox").hide();
			$(".sureBox").hide();
			// 将人员内容清空，然后再进行查询
			$("#adEmployeeName").empty();
			$("#adEmployeeMajor").empty();
		}); 
			//取消按鈕
		$(".cancelModifyEmployeeBtn").click(function(){
			$("#alertModifyBox").hide();
			$(".setModifyBox").hide();
			$(".sureBox").hide();
			// 将人员内容清空，然后再进行查询
			$("#modifyEmployeeName").empty();
			$("#modifyEmployeeMajor").empty();
			//$("#modifyEmployeeType").empty();
		});
		
		//退出按鈕
		$("#infoOut").click(function(){
			window.location.href="http://192.168.1.7:8082/qy/index.html";
		});  
});