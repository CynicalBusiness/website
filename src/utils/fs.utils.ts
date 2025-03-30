import { FileHandle } from "node:fs/promises";

export function readHandleToStream(handle: FileHandle): ReadableStream {
    const stream = handle.createReadStream();
    const streamIterator = stream[Symbol.asyncIterator]();

    return new ReadableStream({
        async pull(controller) {
            const { value, done } = await streamIterator.next();
            if (value) {
                controller.enqueue(value);
            }
            if (done) {
                controller.close();
            }
        },
    });
}
