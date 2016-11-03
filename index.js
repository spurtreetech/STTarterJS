/**
 * Created by ashutosh on 30/7/15.
 */
var request = require("request");

//Creating Class STTarterApi
function Sttarter(app_key,app_secret){

    this.host = 'sttarter.com';
    this.port = 3000;
    this.protocol = 'http';
    this.server = this.protocol+'://'+this.host+':'+this.port;
    this.auth_token = '';
    this.app_key = typeof app_key !== 'undefined' ? app_key : null;
    this.app_secret = typeof app_secret !== 'undefined' ? app_secret : null;

    this.sendSMS = function(mobile,message,callback){

        var post_data = {mobile:mobile,sender:'STTART',message:message};
        this.api("POST","app/sms",post_data,function(res){

            if(res.status == 200){
                callback(res.body);
            }else{
                callback(false);
            }

        });
    },

    this.sendEmail = function(email,subject,message){

        var post_data = {email:email,subject:subject,message:message};
        this.api("POST","app/email",post_data,function(res){

            if(res.status == 200){
                callback(res.body);
            }else{
                callback(false);
            }

        });
    },

    this.getAccessToken = function(app_key,app_secret,callback){
        //Performing Auth
        request.post({
                url:     this.server+'/auth',
                json:    {app_key:app_key,app_secret:app_secret},
            }, function(error, response, body){
                if (!error && response.statusCode == 200) {
                    callback(body.token);
                }else{
                    callback(false);
                }
        });

    },

    this.STTInit = function(app_key,app_secret,username,password,callback){
        //Performing Auth
        request.post({
                url:     this.server+'/init',
                json:    {app_key:app_key,app_secret:app_secret,username:username,password:password},
            }, function(error, response, body){
                if (!error && response.statusCode == 200) {
                    callback(body);
                }else{
                    callback(false);
                }


        });

    },

    this.createApp = function(input,callback){

        var topic_meta = "{'name':'Buzz','allow_reply':'false','is_public':'true'}";
        // Create Organisation and then take org_id to create app
        var post_data = {name:input.name,address:input.address,city:input.city,country:input.country,meta:topic_meta};

        this.api("POST","app/ie/app",post_data,function(res){

            if(res.status == 200){
                callback(res.body);
            }else{
                callback(false);
            }

        });

    },

    this.deleteApp = function(app_key,callback){

            // Delete Organisation

            this.api("DELETE","app/ie/app/"+app_key,{},function(res){
                if(res.status == 200){
                    callback(res.body);
                }else{
                    callback(false);
                }

            });

    },

    this.createUser = function(name,username,email,mobile,avatar,app_key,meta,callback){

        var post_data = {name:name,username:username,email:email,mobile:mobile,avatar:avatar,app_key:app_key,meta:meta};
        this.api("POST","app/user",post_data,function(res){

            if(res.status == 200){
                callback(res.body);
            }else{
                callback(false);
            }

        });

    },

    this.updateUser = function(name,username,email,mobile,avatar,app_key,meta,is_active,callback){

        var post_data = {name:name,username:username,email:email,mobile:mobile,avatar:avatar,app_key:app_key,meta:meta,is_active:is_active};
        this.api("PUT","app/user",post_data,function(res){

            if(res.status == 200){
                callback(res.body);
            }else{
                callback(false);
            }

        });

    },

    this.deleteUser = function(username,app_key,callback){

        var post_data = {username:username,app_key:app_key};
        this.api("DELETE","app/user",post_data,function(res){
            
            if(res.status == 200){
                callback(res.body);
            }else{
                callback(false);
            }

        });

    },

    this.createGroup = function(group_name,app_key,scope,meta,callback){

        var post_data = {group_name:group_name,app_key:app_key,meta:meta,scope:scope};
        this.api("POST","app/ie/group",post_data,function(res){

            if(res.status == 200){
                callback(res.body);
            }else{
                callback(res);
            }

        });

    },

    this.deleteGroup = function(group_name,app_key,callback){

        var post_data = {group_name:group_name,app_key:app_key};
        this.api("DELETE","app/ie/group",post_data,function(res){

            if(res.status == 200){
                callback(res.body);
            }else{
                callback(false);
            }

        });

    },

    this.updateGroup = function(group_name,app_key,scope,meta,callback){

        console.log("log from STTarterApi updateGroup");

        var post_data = {group_name:group_name,app_key:app_key,meta:meta,scope:scope};

        this.api("PUT","app/ie/group",post_data,function(res) {

            if (res.status == 200) {
                  callback(res.body);
            } else {
                  callback(res);
            }

        });

    },

    this.assignUserGroup = function(group_topic,users,app_key,callback){

         var post_data = {group_topic:group_topic,users:users,app_key:app_key};

            this.api("POST","app/ie/assigngroup",post_data,function(res){

                if(res.status == 200){
                    callback(res.body);
                }else{
                    callback(res);
                }

            });

    },

    this.unassignUserGroup = function(group_topic,users,app_key,callback){

         var post_data = {group_topic:group_topic,users:users,app_key:app_key};

            this.api("DELETE","app/ie/assigngroup",post_data,function(res){

                if(res.status == 200){
                    callback(res.body);
                }else{
                    callback(res);
                }

            });

    },

    this.getAppStats = function(app_key,callback){

        this.api("GET","app/stats/"+app_key,{},function(res){

            if(res.status == 200){
                callback(res.body);
            }else{
                callback(false);
            }

        });
    },

    this.getTopicMessages = function(topic,limit,skip,callback){

        this.api("GET","app/messages/"+topic+'/'+limit+'/'+skip,{},function(res){

            if(res.status == 200){
                callback(res.body.messages);
            }else{
                callback(false);
            }

        });
    },

    this.api = function(method,url,postData,callback){

        parent = this; /* Inheritence */

        //making data as optional parameter
        data = typeof data !== 'undefined' ? data : false;

        //Performing Auth
        request.post({
            url:     this.server+'/auth',
            json:    {app_key:this.app_key,app_secret:this.app_secret},
        }, function(error, response, body){

            if (!error && response.statusCode == 200) {
                //Getting Auth Token
                if(body.token){
                    parent.auth_token = body.token;

                /*Starting Api Calls*/
                    request({
                        url: parent.server+'/'+url,
                        method: method,
                        headers: {
                            'x-app-token': parent.auth_token,
                        },
                        json:postData
                    }, function(error, response, body){
                        if(error) {
                            console.log("error occured"+error);
                        } else {
                            //Perform Actions here

                            var apiResp = {status:response.statusCode,body:body}
                            callback(apiResp)
                        }
                    });
                /*Ending Api Calls*/

                }
            }else{
                console.log("unable to process sttarter request");
                console.log(response);
            }
        });
    }

}

module.exports = Sttarter;

