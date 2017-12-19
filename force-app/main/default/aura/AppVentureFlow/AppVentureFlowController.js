({
    doInit : function(component, event, helper) {
        if (component.get("v.flowName")){
            var flow = component.find("flowData");
            flow.startFlow(component.get("v.flowName"), [
                { name : "recordId", type: "String", value : component.get("v.recordId")}
            ]);
            //flow.startFlow(component.get("v.flowName"));
        }
    },

    change : function(component, event, helper) {
        if (event.getParam("status") === "FINISHED") {
            if (component.get("v.finishURL")){
                $A.get("e.force:navigateToURL")
                .setParams({
                    "url": component.get("v.finishURL")
                }).fire();
            } else if (component.get("v.finishId")) {
                $A.get("e.force:navigateToSObject")
                .setParams({
                    "recordId": component.get("v.finishId")
                }).fire();
            } else if (component.get("v.finishIdVar")) {
                var outputVariables = event.getParam("outputVariables");
                for (var i = 0; i < outputVariables.length; i++) {
                    if (outputVariables[i].name === component.get("v.finishIdVar")){
                        $A.get("e.force:navigateToSObject")
                            .setParams({
                                "recordId": outputVariables[i].value
                            }).fire();
                    }
                }
            }

        }

    },
})
