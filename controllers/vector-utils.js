function vectorAdd(vector_a, vector_b) {
    if (Array.isArray(vector_a) && Array.isArray(vector_b) && vector_a.length === vector_b.length) {
        return vector_a.map((a, i) => a + vector_b[i]);
    } else {
        return [];
    }
}

function vectorSubtract(vector_a, vector_b) {
    if (Array.isArray(vector_a) && Array.isArray(vector_b) && vector_a.length === vector_b.length) {
        return vectorAdd(vector_a, vector_b.map(b => -b))
    } else {
        return [];
    }
}

function vectorIsLessThanOrEqual(vector_a, vector_b) {
    if (Array.isArray(vector_a) && Array.isArray(vector_b) && vector_a.length === vector_b.length) {
        return vector_a.every((a, i) => a <= vector_b[i]);
    } else {
        return false;
    }
}

module.exports = {vectorAdd, vectorSubtract, vectorIsLessThanOrEqual};