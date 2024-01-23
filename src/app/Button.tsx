'use client'
export default function Button() {
    const handleClick = (e) =>  {
        console.log(e);
    }
    return (
        <a onClick={handleClick}>get feedback</a>
    )
}