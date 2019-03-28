# vue-component

Include Vue components from file in browser

Step 1: Include the file

    <script src="vue-component-file.js"></script>

Step 2: Make component file

    <!-- app-hello.html -->
    <template>
        <div>Hello {{ str }}</div>
    </template>
    
    <script>
    export default {
        data: function() {
            return {
                str: "World";
            };
        },
    }
    </script>

Step 3: Include component

    <script>
    Vue.componentFile("app-hello", "app-hello.html");
    </script>

Step 4: Run component

    <div id="app">
        <app-hello></app-hello>
    </div>
    
    <script>
    var vm = new Vue({
        el: "#app",
    });
    </script>
