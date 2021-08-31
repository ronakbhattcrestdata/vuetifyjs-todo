<template>
    <div class="home">
         <v-text-field
            class="pa-3"
            outlined
            label="Add Task"
            append-icon="mdi-plus"
            hide-details
            clearable
            v-model="NewTaskTitle"
            @click:append="addTask"
            @keyup.enter="addTask"
          ></v-text-field>
        <v-list
        flat
        class="pt-0"
        > 
        <div class="pl-3 pr-3">
            <v-alert 
                type="success"
                transition="fade-transition"
                :value="SuccessAlert"
            >
               {{AlertText}}
            </v-alert>
        </div>
            <div v-if="tasks.length === 0" class="pa-3">
                <v-card
                    class="d-flex pa-15 justify-center "
                    style="height:100%;text-align:center"
                    outlined
                    tile
                >
                    <div>
                        <p class="text-capitalize font-weight-black">
                            No Task
                        </p>
                        <v-icon
                            large
                            color="primary darken-2"
                        >
                            mdi-check
                        </v-icon>
                    </div>
                </v-card>
            </div>
            <div v-for="task in tasks" :key="task.id" class="pa-0">
                <v-list-item 
                    @click="doneTask(task.id)"
                    :class="{ 'blue lighten-5' : task.done }"
                >
                    <template v-slot:default>
                        <v-list-item-action>
                        <v-checkbox :input-value="task.done"></v-checkbox>
                        </v-list-item-action>

                        <v-list-item-content>
                        <v-list-item-title :class="{ 'text-decoration-line-through' : task.done }">
                            {{ task.title }}
                        </v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn 
                                icon
                                @click.stop="deleteTask(task.id)"
                            >
                                <v-icon color="primary lighten-1">mdi-delete</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </template>
                </v-list-item>
                <v-divider></v-divider>
            </div>
        </v-list>
    </div>
</template>
<script>
export default {
    name: 'Todo',
    data() {
        return {
            NewTaskTitle: '',
            SuccessAlert: false,
            AlertText: '',
            tasks: []
        }
    },
    methods: {
        addTask() {
            if (this.NewTaskTitle.length >= 1) {
                let newTask = {
                    id: Math.floor(Math.random() * 10000000),
                    title: this.NewTaskTitle,
                    done: false
                }
                this.tasks.push(newTask);
                this.NewTaskTitle = ''
                this.SuccessAlert = true,
                this.AlertText = 'Task Added successfully!'
            }
            setTimeout(()=>{
                this.SuccessAlert=false
            },2000)
        },
        doneTask(id) {
            let task = this.tasks.filter(task => task.id === id)[0]
            task.done = !task.done
        },
        deleteTask(id) {
            this.tasks = this.tasks.filter(task => task.id !== id)
            this.SuccessAlert = true,
            this.AlertText = 'Task Deleted successfully!'
            setTimeout(()=>{
                this.SuccessAlert=false
            },2000)
        }
    }
}
</script>