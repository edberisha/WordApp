
// EXAMPLE OF A MEANING OBJECT:
// {
//     "partOfSpeech": "verb",
//     "definitions": [
//         {
//             "definition": "To speak in a disorganized or desultory manner; to babble or prattle.",
//             "synonyms": [],
//             "antonyms": []
//         },
//         {
//             "definition": "To wander or walk aimlessly.",
//             "synonyms": [],
//             "antonyms": []
//         },
//         {
//             "definition": "To beg; to whine like a beggar.",
//             "synonyms": [],
//             "antonyms": []
//         }
//     ],
//     "synonyms": [
//         "babble",
//         "prattle",
//         "ramble",
//         "ramble",
//         "wander"
//     ],
//     "antonyms": []
// }

const Definitions = ({number, meaning}) => {
    const definitions = meaning.definitions.map((definition, index) => {
        return (<p key={index}><strong>Definition:</strong> {definition.definition}</p>)
    });

    return (
        <div>
            <p><strong>Meaning {number + 1}</strong></p>
            <p><strong>Part of Speech:</strong> {meaning.partOfSpeech}</p>
            {definitions}
            <br/>
        </div>
    )
}

export default Definitions;