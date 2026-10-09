class Blood {
    type() {
        const types = ['O', 'A', 'B', 'AB'];
        return types[Math.floor(Math.random() * types.length)];
    }

    rhFactor() {
        const factors = ['+', '-'];
        return factors[Math.floor(Math.random() * factors.length)];
    }

    group() {
        return `${this.type()}${this.rhFactor()}`;
    }
}

export default function blood() {
    return new Blood();
}
