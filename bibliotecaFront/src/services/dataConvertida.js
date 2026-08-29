const dataConvertida = (data) => {
    const date = new Date(data)

    return date.toLocaleString('pt-br')
}

export default dataConvertida