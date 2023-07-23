import { isObject } from "@util";

/**
 * Encapsulates logic to determine if a modifier should be active or not for a specific roll based
 * on a list of string values. This will often be based on traits, but that is not required - sneak
 * attack could be an option that is not a trait.
 * @category PF2
 */
class PredicatePF2e extends Array<PredicateStatement> {
    /** Is the predicate data structurally valid? */
    readonly isValid: boolean;

    constructor(...statements: PredicateStatement[] | [PredicateStatement[]]) {
        super(...(Array.isArray(statements[0]) ? statements[0] : (statements as PredicateStatement[])));
        this.isValid = PredicatePF2e.isValid(this);
    }

    /** Structurally validate the predicates */
    static isValid(statements: unknown): statements is PredicateStatement[] {
        return this.isArray(statements);
    }

    /** Is this an array of predicatation statements? */
    static override isArray(statements: unknown): statements is PredicateStatement[] {
        return super.isArray(statements) && statements.every((s) => StatementValidator.isStatement(s));
    }

    /** Test if the given predicate passes for the given list of options. */
    static test(predicate: PredicateStatement[] = [], options: Set<string> | string[]): boolean {
        return predicate instanceof PredicatePF2e
            ? predicate.test(options)
            : new PredicatePF2e(...predicate).test(options);
    }

    /** Test this predicate against a domain of discourse */
    test(options: Set<string> | string[]): boolean {
        if (this.length === 0) {
            return true;
        } else if (!this.isValid) {
            console.warn("PF2e System | The provided predicate set is malformed.");
            return false;
        }

        const domain = options instanceof Set ? options : new Set(options);
        return this.every((s) => this.#isTrue(s, domain));
    }

    toObject(): RawPredicate {
        return deepClone([...this]);
    }

    clone(): PredicatePF2e {
        return new PredicatePF2e(this.toObject());
    }

    /** Is the provided statement true? */
    #isTrue(statement: PredicateStatement, domain: Set<string>): boolean {
        return (
            (typeof statement === "string" && domain.has(statement)) ||
            (StatementValidator.isBinaryOp(statement) && this.#testBinaryOp(statement, domain)) ||
            (StatementValidator.isCompound(statement) && this.#testCompound(statement, domain))
        );
    }

    #testBinaryOp(statement: BinaryOperation, domain: Set<string>): boolean {
        const operator = Object.keys(statement)[0];

        // Allow for tests of partial statements against numeric values
        // E.g., `{ "gt": ["actor:level", 5] }` would match against "actor:level:6" and "actor:level:7"
        const [left, right] = Object.values(statement)[0];
        const domainArray = Array.from(domain);
        const leftValues = StatementValidator.isMathOperation(left)
            ? this.#resolveMathOperation(left, domain)
            : typeof left === "number" || !Number.isNaN(Number(left))
            ? [Number(left)]
            : domainArray.flatMap((d) => (d.startsWith(left) ? Number(/:(-?\d+)$/.exec(d)?.[1]) : []));
        const rightValues = StatementValidator.isMathOperation(right)
            ? this.#resolveMathOperation(right, domain)
            : typeof right === "number" || !Number.isNaN(Number(right))
            ? [Number(right)]
            : domainArray.flatMap((d) => (d.startsWith(right) ? Number(/:(-?\d+)$/.exec(d)?.[1]) : []));

        switch (operator) {
            case "eq":
                return leftValues.some((l) => rightValues.every((r) => l === r));
            case "gt":
                return leftValues.some((l) => rightValues.every((r) => l > r));
            case "gte":
                return leftValues.some((l) => rightValues.every((r) => l >= r));
            case "lt":
                return leftValues.some((l) => rightValues.every((r) => l < r));
            case "lte":
                return leftValues.some((l) => rightValues.every((r) => l <= r));
            default:
                console.warn("PF2e System | Malformed binary operation encounter");
                return false;
        }
    }

    #resolveMathOperation(statement: MathOperation, domain: Set<string>): number[] {
        const operator = Object.keys(statement)[0];

        const [left, right] = Object.values(statement)[0];
        const domainArray = Array.from(domain);
        const leftValues = domainArray.flatMap((d) => (d.startsWith(left) ? Number(/:(-?\d+)$/.exec(d)?.[1]) : []));
        const rightValues =
            typeof right === "number"
                ? [right]
                : domainArray.flatMap((d) => (d.startsWith(right) ? Number(/:(-?\d+)$/.exec(d)?.[1]) : []));

        switch (operator) {
            case "add":
                return leftValues.flatMap((l) => rightValues.flatMap((r) => l + r));
            case "sub":
                return leftValues.flatMap((l) => rightValues.flatMap((r) => l - r));
            case "mult":
                return leftValues.flatMap((l) => rightValues.flatMap((r) => l * r));
            case "div":
                return leftValues.flatMap((l) => rightValues.flatMap((r) => l / r));
            default:
                console.warn("PF2e System | Malformed math operation encounter");
                return [];
        }
    }

    /** Is the provided compound statement true? */
    #testCompound(statement: Exclude<PredicateStatement, Atom>, domain: Set<string>): boolean {
        return (
            ("and" in statement && statement.and.every((subProp) => this.#isTrue(subProp, domain))) ||
            ("nand" in statement && !statement.nand.every((subProp) => this.#isTrue(subProp, domain))) ||
            ("or" in statement && statement.or.some((subProp) => this.#isTrue(subProp, domain))) ||
            ("xor" in statement && statement.xor.filter((subProp) => this.#isTrue(subProp, domain)).length === 1) ||
            ("nor" in statement && !statement.nor.some((subProp) => this.#isTrue(subProp, domain))) ||
            ("not" in statement && !this.#isTrue(statement.not, domain)) ||
            ("if" in statement && !(this.#isTrue(statement.if, domain) && !this.#isTrue(statement.then, domain)))
        );
    }
}

class StatementValidator {
    static isStatement(statement: unknown): statement is PredicateStatement {
        return statement instanceof Object
            ? this.isCompound(statement) || this.isBinaryOp(statement)
            : typeof statement === "string"
            ? this.isAtomic(statement)
            : false;
    }

    static isAtomic(statement: unknown): statement is Atom {
        return (typeof statement === "string" && statement.length > 0) || this.isBinaryOp(statement);
    }

    static #binaryOperators = new Set(["eq", "gt", "gte", "lt", "lte"]);

    static isBinaryOp(statement: unknown): statement is BinaryOperation {
        if (!isObject(statement)) return false;
        const entries = Object.entries(statement);
        if (entries.length > 1) return false;
        const [operator, operands]: [string, unknown] = entries[0];
        return (
            this.#binaryOperators.has(operator) &&
            Array.isArray(operands) &&
            operands.length === 2 &&
            typeof operands[0] === "string" &&
            (["string", "number"].includes(typeof operands[1]) || this.isMathOperation(operands[1]))
        );
    }

    private static mathOperators = new Set(["add", "sub", "mult", "div"]);

    static isMathOperation(statement: unknown): statement is MathOperation {
        if (!isObject(statement)) return false;
        const entries = Object.entries(statement);
        if (entries.length > 1) return false;
        const [operator, operands]: [string, unknown] = entries[0];
        return (
            this.mathOperators.has(operator) &&
            Array.isArray(operands) &&
            operands.length === 2 &&
            typeof operands[0] === "string" &&
            ["string", "number"].includes(typeof operands[1])
        );
    }

    static isCompound(statement: unknown): statement is CompoundStatement {
        return (
            isObject(statement) &&
            (this.isAnd(statement) ||
                this.isOr(statement) ||
                this.isNand(statement) ||
                this.isXor(statement) ||
                this.isNor(statement) ||
                this.isNot(statement) ||
                this.isIf(statement))
        );
    }

    static isAnd(statement: { and?: unknown }): statement is Conjunction {
        return (
            Object.keys(statement).length === 1 &&
            Array.isArray(statement.and) &&
            statement.and.every((subProp) => this.isStatement(subProp))
        );
    }

    static isNand(statement: { nand?: unknown }): statement is AlternativeDenial {
        return (
            Object.keys(statement).length === 1 &&
            Array.isArray(statement.nand) &&
            statement.nand.every((subProp) => this.isStatement(subProp))
        );
    }

    static isOr(statement: { or?: unknown }): statement is Disjunction {
        return (
            Object.keys(statement).length === 1 &&
            Array.isArray(statement.or) &&
            statement.or.every((subProp) => this.isStatement(subProp))
        );
    }

    static isXor(statement: { xor?: unknown }): statement is ExclusiveDisjunction {
        return (
            Object.keys(statement).length === 1 &&
            Array.isArray(statement.xor) &&
            statement.xor.every((subProp) => this.isStatement(subProp))
        );
    }

    static isNor(statement: { nor?: unknown }): statement is JointDenial {
        return (
            Object.keys(statement).length === 1 &&
            Array.isArray(statement.nor) &&
            statement.nor.every((subProp) => this.isStatement(subProp))
        );
    }

    static isNot(statement: { not?: unknown }): statement is Negation {
        return Object.keys(statement).length === 1 && !!statement.not && this.isStatement(statement.not);
    }

    static isIf(statement: { if?: unknown; then?: unknown }): statement is Conditional {
        return (
            Object.keys(statement).length === 2 && this.isStatement(statement.if) && this.isStatement(statement.then)
        );
    }
}

type Add = { add: [string, string | number] };
type Subtract = { sub: [string, string | number] };
type Multiply = { mult: [string, string | number] };
type Divide = { div: [string, string | number] };
type MathOperation = Add | Subtract | Multiply | Divide;

type EqualTo = { eq: [string, string | number | MathOperation] };
type GreaterThan = { gt: [string, string | number | MathOperation] };
type GreaterThanEqualTo = { gte: [string, string | number | MathOperation] };
type LessThan = { lt: [string, string | number | MathOperation] };
type LessThanEqualTo = { lte: [string, string | number | MathOperation] };
type BinaryOperation = EqualTo | GreaterThan | GreaterThanEqualTo | LessThan | LessThanEqualTo;
type Atom = string | BinaryOperation;

type Conjunction = { and: PredicateStatement[] };
type Disjunction = { or: PredicateStatement[] };
type ExclusiveDisjunction = { xor: PredicateStatement[] };
type Negation = { not: PredicateStatement };
type AlternativeDenial = { nand: PredicateStatement[] };
type JointDenial = { nor: PredicateStatement[] };
type Conditional = { if: PredicateStatement; then: PredicateStatement };
type CompoundStatement =
    | Conjunction
    | Disjunction
    | ExclusiveDisjunction
    | AlternativeDenial
    | JointDenial
    | Negation
    | Conditional;

type PredicateStatement = Atom | CompoundStatement;

type RawPredicate = PredicateStatement[];

export { PredicatePF2e, PredicateStatement, RawPredicate, StatementValidator };
