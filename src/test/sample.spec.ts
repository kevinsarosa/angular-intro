const HelloWorld = () =>{
    return 'Hello World'
}

describe('HelloWorld()',()=>{

    it('Say hello world',()=>{
        expect(HelloWorld()).toEqual('Hello World')
    })

    it('Say hello world',()=>{
        expect(HelloWorld()).not.toEqual('Hello')
    })
})


describe('The Number Matcher',()=>{
    it('test',()=>{
        const value = 3+3

        expect('3').toBeLessThan(value)
        expect(5.99999).toBeCloseTo(6.0)
    })
})


describe('The Testing Asynchronus', () => {
    function fetchData(cb:any) {
        setTimeout(() => {
            cb("Enigmacamp")
        }, 1000);
    }

    it('The Data Is Enigmacamp', (done) => {
        function callback(data:any) {
            expect(data).toBe("Enigmacamp")
            done()
        }
        fetchData(callback)
    })

function test(){
    return new Promise<string>((resolve,reject)=>{
        setTimeout(() => {
            resolve('Enigmacamp')
        }, 1000);
        
    })
}

    describe('Promise',()=>{
        it('TestPromise then',()=>{
            return test().then(data=>{
                expect(data).toBe('Enigmacamp')
            })
        })

        it('TestPromise async',async()=>{
             return expect(await test()).toBe('Enigmacamp')
        })
        
    })
})