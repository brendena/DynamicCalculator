/*
Does Everthing
So i have the type in value of the Input
As like
"`34 FN`"
Where it will convert it the base value.Right before

Then i have to figure out how th mathml stuff going to work out.
https://github.com/ben-ng/convert-units
*/
interface BaseUnit {
    metrics: string;
}

interface SearchFunc {
    test(source: string, subString: string): boolean;
}
