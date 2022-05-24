// let filtered = [
//     {
//         "txid": "4a4a48282eb6455816620298211ade45ebcc2900635dcd68c157121677994af2",
//         "vout": 0
//     },
//     {
//         "txid": "b06c5dc51b96d69d4b7ecd8cd93531c5902fb0163e66c7a4147dd83efee26fcf",
//         "vout": 1
//     },
//     {
//         "txid": "a0faf1399dba2b7c6dfd1d6c010e74e4cac094b1d41c72225db6e2a3bf519998",
//         "vout": 0
//     }
// ]

function Table(filtered: any[]){
    return(
        <table className="table">
            <thead>
                <tr>
                    <th>S.N</th>
                    <th>Full Name</th>
                    <th>Email Address</th>
                    <th>Salary</th>
                </tr>
            </thead>
            <tbody>
            {
                filtered.map((item: any, index: number)=>{
                    return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.txid}</td>
                            <td>{item.vout}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}
export default Table;