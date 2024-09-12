const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

let message = "Welcome to in.Orbit"


let goals

const loadGoals = async () => {
    try {
        const dados = await fs.readFile("goals.json", "utf-8")
        goals = JSON.parse(dados)
    } catch (error) {
        goals = []
    }
}

const saveGoals = async () => {
    await fs.writeFile("goals.json", JSON.stringify(goals, null, 2))
}

const registerGoals = async () => {
    const goal = await input({ message: "Enter a goal:" })

    if (goal.length == 0) {
        console.log('The goal cannot be empty.')
        return
    }

    goals.push(
        { value: goal, checked: false }
    )

    message = "Target successfully registered"
}

const listGoals = async () => {
    if (goals.length == 0) {
        message = "There are no goals :("
        return
    }

    const responses = await checkbox({
        message: "Use the arrows to change the goal, space to mark or unmark and Enter to end the stage.",
        choices: [...goals],
        instructions: false,
    })

    goals.forEach((m) => {
        m.checked = false
    })

    if (responses.length == 0) {
        message = "No goal selected!"
        return
    }

    responses.forEach((response) => {
        const goal = goals.find((m) => {
            return m.value == response
        })

        goal.checked = true
    })

    message = 'Target(s) marked as completed'

}

const completedGoals = async () => {
    if (goals.length == 0) {
        message = "There are no goals :("
        return
    }
    const completed = goals.filter((goal) => {
        return goal.checked
    })

    if (completed.length == 0) {
        message = "No goals completed :("
        return;
    }

    await select({
        message: "Goals achieved: " + completed.length,
        choices: [...completed]
    })
}

const openGoals = async () => {
    if (goals.length == 0) {
        message = "There are no goals :("
        return
    }
    const open = goals.filter((goal) => {
        return !goal.checked
    })

    if (open.length == 0) {
        message = "There are no open goals :)"
        return
    }

    await select({
        message: "Open goals: " + open.length,
        choices: [...open]
    })
}

const deleteGoals = async () => {
    if (goals.length == 0) {
        message = "There are no goals :("
        return
    }
    if (goals.length == 0) {
        message = "No goal found :("
        return
    }

    const uncheckedGoals = goals.map((goal) => {
        return { value: goal.value, checked: false }
    })

    const itemToDelete = await checkbox({
        message: "Select item to delete",
        choices: [...uncheckedGoals],
        instructions: false,
    })

    if (itemToDelete.length == 0) {
        message = "No items to delete"
        return
    }

    itemToDelete.forEach((item) => {
        goals = goals.filter((goal) => {
            return goal.value != item
        })
    })

    message = "Target(s) successfully removed"
}

const showMessage = () => {
    console.clear()

    console.log("-----------------------------------")
    console.log("|https://github.com/rinel-benjamim|")
    console.log("-----------------------------------")

    if (message != "") {

        console.log(message)
        console.log("")
        message = ""
    }
}

const start = async () => {
    await loadGoals()

    while (true) {
        await saveGoals()
        showMessage()

        const option = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Register goal",
                    value: "register"
                },
                {
                    name: "List goals",
                    value: "list"
                },
                {
                    name: "Goals achieved",
                    value: "completed"
                },
                {
                    name: "Open goals",
                    value: "open"
                },
                {
                    name: "Remove targets",
                    value: "remover"
                },
                {
                    name: "Exit",
                    value: "exit"
                }
            ]
        })

        switch (option) {
            case "register":
                await registerGoals()
                break
            case "list":
                await listGoals()
                break
            case "completed":
                await completedGoals()
                break
            case "open":
                await openGoals()
                break
            case "remover":
                await deleteGoals()
                break
            case "exit":
                console.log('See you next time!')
                return
        }
    }
}

start();