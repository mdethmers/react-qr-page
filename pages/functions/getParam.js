
function getParam(param){
    if (typeof window !== 'undefined') {
        let params = new URLSearchParams(window.location.search);
        let foo = params.get(param);
        return foo;
      }
    else return 1;

}

export default getParam;